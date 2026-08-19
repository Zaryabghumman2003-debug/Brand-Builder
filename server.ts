import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser with 50mb limit for base64 image data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Server-Side GenAI Client initialization with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/**
 * STRICT NEGATIVE CONSTRAINT:
 * Ensure NO people/humans appear in any generated image.
 */
const STRICT_NO_PEOPLE_CONSTRAINT = 
  "STRICT NEGATIVE DIRECTIVE: Absolutely NO people, NO human models, NO faces, NO hands, NO silhouettes, NO pedestrians, NO crowds. Pure product-focused still-life or architectural environmental staging with zero humans present.";

/**
 * Helper to execute an async action with automatic retries for transient 429 rate limit errors
 */
async function executeWithRetry<T>(
  action: () => Promise<T>,
  maxRetries = 2,
  baseDelayMs = 2500
): Promise<T> {
  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await action();
    } catch (err: any) {
      lastError = err;
      const is429 =
        err?.status === 429 ||
        err?.statusCode === 429 ||
        err?.message?.includes("429") ||
        err?.message?.includes("RESOURCE_EXHAUSTED") ||
        err?.message?.includes("quota") ||
        err?.message?.includes("Quota exceeded");

      if (is429 && attempt < maxRetries) {
        // Extract retryDelay from error if present (e.g. 8s or 14s)
        let delayMs = baseDelayMs * Math.pow(1.8, attempt);
        try {
          const match = err?.message?.match(/retry in ([0-9.]+)s/i);
          if (match && match[1]) {
            const parsed = parseFloat(match[1]) * 1000;
            if (!isNaN(parsed) && parsed > 0 && parsed <= 15000) {
              delayMs = parsed + 500;
            }
          }
        } catch {
          // fallback to delayMs
        }
        console.log(`[Rate Limit 429] Retrying attempt ${attempt + 1}/${maxRetries} after ${delayMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

/**
 * Image Generation Endpoint using Nano-Banana model ('gemini-3.1-flash-lite-image')
 * or Nano-Banana 2 ('gemini-3.1-flash-image').
 */
app.post("/api/generate-image", async (req, res) => {
  try {
    const {
      prompt,
      model = "gemini-3.1-flash-lite-image", // Nano-Banana default
      aspectRatio = "1:1",
      baseImage, // optional { data: string (base64 without prefix), mimeType: string }
      productAnchorText,
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured on the server. Please add it to your environment.",
      });
    }

    // Supported aspect ratios for Nano-Banana: "1:1", "3:4", "4:3", "9:16", "16:9"
    const validAspectRatios = ["1:1", "3:4", "4:3", "9:16", "16:9", "1:4", "1:8", "4:1", "8:1"];
    const safeAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : "1:1";

    // Combine prompt with product anchor and strict no-people constraint
    const fullPrompt = [
      productAnchorText ? `[PRODUCT VISUAL SPECIFICATION: ${productAnchorText}]` : "",
      prompt,
      STRICT_NO_PEOPLE_CONSTRAINT,
      "Ensure ultra-sharp photorealistic commercial advertising aesthetic, immaculate surface lighting, accurate material textures, and studio color grade."
    ].filter(Boolean).join("\n\n");

    const parts: any[] = [];

    // If base reference image is provided, include it for visual consistency
    if (baseImage && baseImage.data) {
      parts.push({
        inlineData: {
          data: baseImage.data,
          mimeType: baseImage.mimeType || "image/png",
        },
      });
      parts.push({
        text: `CRITICAL INSTRUCTION: Maintain exact product visual consistency (shape, colors, materials, logo, packaging proportions) from the reference image above. Place this exact product seamlessly into the following context with NO humans:\n\n${fullPrompt}`,
      });
    } else {
      parts.push({
        text: fullPrompt,
      });
    }

    // Model selection: 'gemini-3.1-flash-lite-image' (Nano-Banana) or 'gemini-3.1-flash-image' (Nano-Banana 2)
    const selectedModel = model === "gemini-3.1-flash-image" ? "gemini-3.1-flash-image" : "gemini-3.1-flash-lite-image";

    const response = await executeWithRetry(() =>
      ai.models.generateContent({
        model: selectedModel,
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: safeAspectRatio,
          },
        },
      })
    );

    let imageUrl: string | null = null;
    let textFeedback: string | null = null;

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || "image/png";
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        } else if (part.text) {
          textFeedback = part.text;
        }
      }
    }

    if (!imageUrl) {
      return res.status(500).json({
        error: textFeedback || "No image was returned by the Nano-Banana model. Please try a different prompt.",
      });
    }

    return res.json({
      imageUrl,
      modelUsed: selectedModel,
      aspectRatio: safeAspectRatio,
    });
  } catch (error: any) {
    console.error("Error generating image with Nano-Banana:", error);
    
    // Parse error details cleanly
    const errMsg = error?.message || "";
    let isQuotaError = false;
    let cleanMessage = "Failed to generate image with Nano-Banana model.";

    if (
      errMsg.includes("429") ||
      errMsg.includes("quota") ||
      errMsg.includes("RESOURCE_EXHAUSTED") ||
      errMsg.includes("Quota exceeded")
    ) {
      isQuotaError = true;
      cleanMessage =
        "Gemini image quota reached (429 Rate Limit). Image generation requires a paid Gemini API key on your project, or retry in a few moments.";
    } else if (errMsg.includes("API key not valid") || errMsg.includes("UNAUTHENTICATED")) {
      cleanMessage = "Invalid or unauthenticated API key. Please check your API key in Settings > Secrets.";
    } else if (errMsg) {
      // Clean up raw JSON if the error contains stringified JSON
      try {
        const jsonMatch = errMsg.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.error?.message) {
            cleanMessage = parsed.error.message.split("\n")[0];
          }
        } else {
          cleanMessage = errMsg;
        }
      } catch {
        cleanMessage = errMsg;
      }
    }

    return res.status(error?.status || 500).json({
      error: cleanMessage,
      isQuotaError,
      requiresPaidKey: isQuotaError,
    });
  }
});

/**
 * Enhance Product Specifications & Blueprint using Gemini 3.7 Flash
 */
app.post("/api/enhance-brand", async (req, res) => {
  try {
    const { name, category, rawDescription, primaryColor, secondaryColor, accentColor, aestheticStyle } = req.body;

    const prompt = `You are an elite creative director and industrial product designer for iconic commercial brands.
Analyze the following product concept and expand it into a structured, highly cohesive visual specification and advertising strategy.

Product Name: ${name || "Untitled Product"}
Category: ${category || "General Consumer Goods"}
Raw Description: ${rawDescription || "A modern premium product"}
Colors: Primary=${primaryColor || "Charcoal"}, Secondary=${secondaryColor || "Cream"}, Accent=${accentColor || "Gold"}
Aesthetic Style: ${aestheticStyle || "Minimalist Luxury"}

IMPORTANT REQUIREMENT: All advertising mediums must be pure product-only compositions with ZERO humans/models.

Respond strictly in JSON matching this schema:
{
  "productAnchor": "A comprehensive 2-sentence visual description of the exact physical product (shape, materials, finishes, cap/bottle/box details, typography, logo placement) to lock in consistency across all visual shots.",
  "tagline": "A punchy, memorable 3-6 word brand tagline",
  "brandStory": "A 2-sentence compelling brand positioning statement",
  "mediumPrompts": {
    "billboard": "Detailed prompt for an expansive 16:9 outdoor architectural highway or skyscraper billboard with dramatic dusk/golden hour sky, modern architectural framework, sharp product focus, bold typography placement, zero people.",
    "newspaper": "Detailed prompt for a vintage/modern editorial newspaper broadsheet advertisement with authentic newsprint halftone texture, structured column grid, clean bold display typography, high-contrast monochrome/duotone product still life, zero people.",
    "social_post": "Detailed prompt for an immaculate 1:1 square Instagram/social media studio flat-lay or dynamic angle product showcase with minimalist prop staging, crisp directional lighting, luxury aesthetic, zero people.",
    "subway": "Detailed prompt for a modern subway transit station wall lightbox poster, sleek ceramic tiles, glass reflections, clean transit architecture framing the product, zero people.",
    "magazine": "Detailed prompt for a double-page luxury editorial fashion/design magazine spread, expansive negative space, sculptural pedestal staging, soft daylight shadows, zero people.",
    "storefront": "Detailed prompt for an ultra-high-end flagship boutique glass vitrine window display at night, dramatic gallery spotlighting, bespoke geometric podiums, zero people.",
    "merch_packaging": "Detailed prompt for an unboxing suite with embossed rigid gift box, premium branded tote bag, ceramic cup, and product packaging lined up on a polished marble surface, zero people.",
    "web_hero": "Detailed prompt for a widescreen 16:9 digital flagship website hero banner, clean gradient depth, floating product angle with subtle water ripples or atmospheric mist, zero people."
  },
  "copyDeck": {
    "headline": "Campaign Lead Headline",
    "subhead": "Sub-headline for print and digital ads",
    "bodyCopy": "A short 2-sentence advertising copy for editorial/print",
    "callToAction": "Call to action text (e.g. 'Discover the Collection')",
    "hashtags": ["#BrandTag1", "#BrandTag2", "#DesignTag3", "#MinimalistLuxury"]
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an expert brand designer and copywriter. Always output valid, well-structured JSON without markdown formatting.",
      },
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Error enhancing brand:", error);
    return res.status(500).json({ error: error?.message || "Failed to enhance brand details" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Brand Builder server running on http://localhost:${PORT}`);
  });
}

startServer();
