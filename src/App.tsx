/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProductSpec, CopyDeck, MediumId, GeneratedShot } from './types';
import { MEDIUMS } from './data/mediums';
import { PRESET_BRANDS } from './data/presets';
import { Header } from './components/Header';
import { ConsistencyEnforcerBanner } from './components/ConsistencyEnforcerBanner';
import { ProductEditor } from './components/ProductEditor';
import { MasterHeroShot } from './components/MasterHeroShot';
import { MediumGrid } from './components/MediumGrid';
import { ImageLightbox } from './components/ImageLightbox';
import { BrandBookModal } from './components/BrandBookModal';
import { Sparkles, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

const INITIAL_PRESET = PRESET_BRANDS[0];

export default function App() {
  const [product, setProduct] = useState<ProductSpec>(INITIAL_PRESET.spec);
  const [copyDeck, setCopyDeck] = useState<CopyDeck>(INITIAL_PRESET.copyDeck);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.1-flash-lite-image' | 'gemini-3.1-flash-image'>('gemini-3.1-flash-lite-image');
  
  // Shots dictionary
  const [shots, setShots] = useState<Record<MediumId, GeneratedShot>>(() => {
    const initShots: Record<string, GeneratedShot> = {};
    MEDIUMS.forEach((m) => {
      initShots[m.id] = {
        id: m.id,
        mediumId: m.id,
        mediumName: m.name,
        imageUrl: null,
        prompt: m.defaultPrompt(INITIAL_PRESET.spec),
        aspectRatio: m.defaultAspectRatio,
        status: 'idle',
      };
    });
    return initShots as Record<MediumId, GeneratedShot>;
  });

  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [inspectingShot, setInspectingShot] = useState<GeneratedShot | null>(null);
  const [isBrandBookOpen, setIsBrandBookOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper to extract clean base64 data (without data:image/png;base64, prefix)
  const extractBase64Data = (dataUrl: string) => {
    const parts = dataUrl.split(',');
    if (parts.length === 2) {
      const mimeMatch = parts[0].match(/:(.*?);/);
      return {
        data: parts[1],
        mimeType: mimeMatch ? mimeMatch[1] : 'image/png',
      };
    }
    return null;
  };

  // Update medium prompts when product spec changes
  const updateProduct = (updated: Partial<ProductSpec>) => {
    const newProduct = { ...product, ...updated };
    setProduct(newProduct);

    // Update default prompts for un-customized shots
    setShots((prev) => {
      const next = { ...prev };
      MEDIUMS.forEach((m) => {
        if (!next[m.id]?.imageUrl) {
          next[m.id] = {
            ...next[m.id],
            prompt: m.defaultPrompt(newProduct),
          };
        }
      });
      return next;
    });
  };

  const updateCopyDeck = (updated: Partial<CopyDeck>) => {
    setCopyDeck((prev) => ({ ...prev, ...updated }));
  };

  // Load a preset
  const handleSelectPreset = (presetId: string) => {
    const preset = PRESET_BRANDS.find((b) => b.id === presetId);
    if (!preset) return;

    setProduct(preset.spec);
    setCopyDeck(preset.copyDeck);

    // Reset shots to new preset default prompts
    const newShots: Record<string, GeneratedShot> = {};
    MEDIUMS.forEach((m) => {
      newShots[m.id] = {
        id: m.id,
        mediumId: m.id,
        mediumName: m.name,
        imageUrl: null,
        prompt: m.defaultPrompt(preset.spec),
        aspectRatio: m.defaultAspectRatio,
        status: 'idle',
      };
    });
    setShots(newShots as Record<MediumId, GeneratedShot>);
    showToast(`Loaded preset: ${preset.name}`, 'success');
  };

  // Reset all
  const handleReset = () => {
    const blankProduct: ProductSpec = {
      name: '',
      category: '',
      description: '',
      materials: '',
      primaryColor: '#D97706',
      secondaryColor: '#1E293B',
      accentColor: '#FDE68A',
      logoDescription: '',
      tagline: '',
      brandStory: '',
      aestheticStyle: 'Minimalist commercial luxury',
      productAnchor: '',
    };
    const blankDeck: CopyDeck = {
      headline: '',
      subhead: '',
      bodyCopy: '',
      callToAction: '',
      hashtags: [],
    };
    setProduct(blankProduct);
    setCopyDeck(blankDeck);

    const blankShots: Record<string, GeneratedShot> = {};
    MEDIUMS.forEach((m) => {
      blankShots[m.id] = {
        id: m.id,
        mediumId: m.id,
        mediumName: m.name,
        imageUrl: null,
        prompt: m.defaultPrompt(blankProduct),
        aspectRatio: m.defaultAspectRatio,
        status: 'idle',
      };
    });
    setShots(blankShots as Record<MediumId, GeneratedShot>);
    showToast('Reset product workspace', 'info');
  };

  // Enhance specs with Gemini 3.7 Flash
  const handleEnhanceWithAI = async () => {
    if (!product.name) {
      showToast('Please enter a product name first', 'error');
      return;
    }

    setIsEnhancing(true);
    try {
      const res = await fetch('/api/enhance-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: product.name,
          category: product.category,
          rawDescription: product.description || product.materials,
          primaryColor: product.primaryColor,
          secondaryColor: product.secondaryColor,
          accentColor: product.accentColor,
          aestheticStyle: product.aestheticStyle,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to enhance brand details');
      }

      const data = await res.json();

      setProduct((prev) => ({
        ...prev,
        productAnchor: data.productAnchor || prev.productAnchor,
        tagline: data.tagline || prev.tagline,
        brandStory: data.brandStory || prev.brandStory,
      }));

      if (data.copyDeck) {
        setCopyDeck({
          headline: data.copyDeck.headline || copyDeck.headline,
          subhead: data.copyDeck.subhead || copyDeck.subhead,
          bodyCopy: data.copyDeck.bodyCopy || copyDeck.bodyCopy,
          callToAction: data.copyDeck.callToAction || copyDeck.callToAction,
          hashtags: data.copyDeck.hashtags || copyDeck.hashtags,
        });
      }

      // If tailored medium prompts were generated, update them
      if (data.mediumPrompts) {
        setShots((prev) => {
          const next = { ...prev };
          Object.keys(data.mediumPrompts).forEach((key) => {
            const mId = key as MediumId;
            if (next[mId] && !next[mId].imageUrl) {
              next[mId] = {
                ...next[mId],
                prompt: data.mediumPrompts[key],
              };
            }
          });
          return next;
        });
      }

      showToast('Brand specifications & copy deck enhanced!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to enhance brand details', 'error');
    } finally {
      setIsEnhancing(false);
    }
  };

  // Generate a single shot using Nano-Banana
  const generateShot = async (mediumId: MediumId, customPrompt?: string): Promise<string | null> => {
    if (!product.name) {
      showToast('Please specify a product name', 'error');
      return null;
    }

    const config = MEDIUMS.find((m) => m.id === mediumId);
    if (!config) return null;

    const promptToUse = customPrompt || shots[mediumId]?.prompt || config.defaultPrompt(product);

    setGeneratingIds((prev) => new Set(prev).add(mediumId));
    setShots((prev) => ({
      ...prev,
      [mediumId]: {
        ...prev[mediumId],
        status: 'generating',
        prompt: promptToUse,
        error: undefined,
      },
    }));

    try {
      // If we are generating a medium other than master_packshot and master packshot image exists,
      // pass it as the reference image anchor for image-to-image consistency!
      let baseImageData = null;
      if (mediumId !== 'master_packshot' && shots.master_packshot?.imageUrl) {
        baseImageData = extractBase64Data(shots.master_packshot.imageUrl);
      }

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse,
          model: selectedModel,
          aspectRatio: config.defaultAspectRatio,
          productAnchorText: product.productAnchor || product.materials,
          baseImage: baseImageData,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to generate ${config.name}`);
      }

      const result = await response.json();
      const imageUrl = result.imageUrl;

      setShots((prev) => ({
        ...prev,
        [mediumId]: {
          ...prev[mediumId],
          imageUrl,
          status: 'completed',
          timestamp: Date.now(),
          modelUsed: result.modelUsed || selectedModel,
        },
      }));

      showToast(`Generated ${config.name} with Nano-Banana`, 'success');
      return imageUrl;
    } catch (error: any) {
      console.error(`Error generating ${mediumId}:`, error);
      setShots((prev) => ({
        ...prev,
        [mediumId]: {
          ...prev[mediumId],
          status: 'error',
          error: error.message || 'Image generation failed',
        },
      }));
      showToast(error.message || `Failed to generate ${config.name}`, 'error');
      return null;
    } finally {
      setGeneratingIds((prev) => {
        const next = new Set(prev);
        next.delete(mediumId);
        return next;
      });
    }
  };

  // Batch generate all mediums in sequence with polite pacing to prevent 429 rate limits
  const handleBatchGenerateAll = async () => {
    if (!product.name) {
      showToast('Please describe your product first', 'error');
      return;
    }

    setIsBatchGenerating(true);
    showToast('Starting Full Brand Campaign Generation...', 'info');

    try {
      // Step 1: Generate Master Packshot first if not present
      if (!shots.master_packshot?.imageUrl) {
        showToast('Generating Master Studio Packshot Anchor first...', 'info');
        const packshotUrl = await generateShot('master_packshot');
        // Brief pause after master packshot
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!packshotUrl) {
          showToast('Master packshot failed or rate-limited. Pausing batch.', 'error');
        }
      }

      // Step 2: Generate remaining mediums with sequential spacing
      const remainingMediums = MEDIUMS.filter(
        (m) => m.id !== 'master_packshot' && !shots[m.id]?.imageUrl
      );

      for (let i = 0; i < remainingMediums.length; i++) {
        const medium = remainingMediums[i];
        const res = await generateShot(medium.id);
        
        // If not the last item, wait 2.5 seconds between generations to stay within RPM rate limits
        if (i < remainingMediums.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2500));
        }
      }

      showToast('Full Brand Campaign Generation Complete!', 'success');
    } catch (err: any) {
      console.error('Batch generation error:', err);
      showToast('Batch generation encountered an issue. You can retry individual shots.', 'error');
    } finally {
      setIsBatchGenerating(false);
    }
  };

  const completedCount = (Object.values(shots) as GeneratedShot[]).filter((s) => s.imageUrl).length;
  const totalCount = MEDIUMS.length;
  const hasMasterShot = !!shots.master_packshot?.imageUrl;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold shadow-2xl backdrop-blur-md transition-all ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-500/40'
              : toastMessage.type === 'error'
              ? 'bg-rose-950/90 text-rose-200 border border-rose-500/40'
              : 'bg-slate-900/95 text-slate-100 border border-slate-700 shadow-indigo-950/50'
          }`}
        >
          {toastMessage.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
          {toastMessage.type === 'error' && <AlertCircle className="h-4 w-4 text-rose-400" />}
          {toastMessage.type === 'info' && <Sparkles className="h-4 w-4 text-indigo-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Sticky Header */}
      <Header
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        onOpenBrandBook={() => setIsBrandBookOpen(true)}
        onBatchGenerateAll={handleBatchGenerateAll}
        isBatchGenerating={isBatchGenerating}
        selectedModel={selectedModel}
        onChangeModel={setSelectedModel}
        completedCount={completedCount}
        totalCount={totalCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-6">
        {/* Consistency & Policy Enforcer Bar */}
        <ConsistencyEnforcerBanner
          product={product}
          hasMasterShot={hasMasterShot}
          selectedModel={selectedModel}
        />

        {/* 1. Product Editor Form & AI Enhance */}
        <ProductEditor
          product={product}
          copyDeck={copyDeck}
          onChangeProduct={updateProduct}
          onChangeCopyDeck={updateCopyDeck}
          onEnhanceWithAI={handleEnhanceWithAI}
          isEnhancing={isEnhancing}
        />

        {/* 2. Master Studio Commercial Packshot (Anchor) */}
        <MasterHeroShot
          shot={
            shots.master_packshot || {
              id: 'master_packshot',
              mediumId: 'master_packshot',
              mediumName: 'Master Studio Packshot',
              imageUrl: null,
              prompt: MEDIUMS[0].defaultPrompt(product),
              aspectRatio: '1:1',
              status: 'idle',
            }
          }
          product={product}
          onGenerate={generateShot}
          onInspect={setInspectingShot}
          isGenerating={generatingIds.has('master_packshot')}
          selectedModel={selectedModel}
        />

        {/* 3. Cross-Medium Campaign Gallery */}
        <MediumGrid
          shots={shots}
          product={product}
          copyDeck={copyDeck}
          onGenerateShot={generateShot}
          onInspectShot={setInspectingShot}
          generatingIds={generatingIds}
        />
      </main>

      {/* Lightbox Modal */}
      {inspectingShot && (
        <ImageLightbox
          shot={inspectingShot}
          allShots={Object.values(shots) as GeneratedShot[]}
          product={product}
          copyDeck={copyDeck}
          onClose={() => setInspectingShot(null)}
          onSelectShot={setInspectingShot}
        />
      )}

      {/* Brand Book Modal */}
      <BrandBookModal
        isOpen={isBrandBookOpen}
        onClose={() => setIsBrandBookOpen(false)}
        product={product}
        copyDeck={copyDeck}
        shots={shots}
        onInspectShot={(shot) => {
          setIsBrandBookOpen(false);
          setInspectingShot(shot);
        }}
      />
    </div>
  );
}
