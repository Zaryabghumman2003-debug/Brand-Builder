import { MediumConfig, ProductSpec } from '../types';

export const MEDIUMS: MediumConfig[] = [
  {
    id: 'master_packshot',
    name: 'Master Studio Packshot',
    label: 'Studio Anchor Shot',
    iconName: 'Sparkles',
    defaultAspectRatio: '1:1',
    category: 'core',
    description: 'High-end pristine commercial studio packshot on a bespoke pedestal with dramatic lighting. Sets the master visual anchor.',
    promptGuide: 'Clean studio background, soft directional light, sharp product focus, subtle reflections, no humans.',
    defaultPrompt: (spec: ProductSpec) =>
      `A master commercial studio packshot of ${spec.name} (${spec.category}). The product features ${spec.materials}. Exact color palette: primary ${spec.primaryColor}, secondary ${spec.secondaryColor}, accent ${spec.accentColor}. Featuring the logo: "${spec.logoDescription}". Displayed standing pristine and centered on a minimalist textured pedestal with soft directional key lighting and warm subtle shadows against a refined ${spec.aestheticStyle} studio backdrop. Ultra-sharp product focus, crisp material textures, photorealistic advertising still life. STRICT NEGATIVE: Absolutely NO people, NO human models, NO hands, NO faces.`,
  },
  {
    id: 'billboard',
    name: 'Outdoor Urban Billboard',
    label: 'Highway & City Billboard',
    iconName: 'Maximize2',
    defaultAspectRatio: '16:9',
    category: 'outdoor',
    description: 'Expansive 16:9 outdoor architectural billboard structure towering over a modern metropolis or scenic highway at dusk.',
    promptGuide: 'Wide-angle architectural shot of a massive steel highway or rooftop billboard displaying the product with bold typography.',
    defaultPrompt: (spec: ProductSpec) =>
      `A cinematic wide-angle commercial shot of a towering outdoor urban highway billboard structure against a dramatic sunset sky with soft twilight city lights in the distant blurred background. The illuminated billboard advertisement prominently features a high-impact advertising display of ${spec.name} (${spec.materials}) with the bold headline: "${spec.tagline}" and brand logo "${spec.logoDescription}". Crisp steel architectural beams and floodlights frame the display. Ultra-sharp realistic architectural staging. STRICT NEGATIVE: Absolutely NO people, NO pedestrians, NO drivers, NO human silhouettes, NO hands. Pure empty architectural and commercial still shot.`,
  },
  {
    id: 'newspaper',
    name: 'Print Broadsheet Newspaper Ad',
    label: 'Vintage & Modern Newspaper',
    iconName: 'Newspaper',
    defaultAspectRatio: '3:4',
    category: 'print',
    description: 'Full-page editorial newspaper advertisement with authentic textured newsprint, halftone dot grain, and structured typography columns.',
    promptGuide: 'Editorial broadsheet newspaper flat-lay or angled open paper displaying a sharp high-contrast product advertisement.',
    defaultPrompt: (spec: ProductSpec) =>
      `A photorealistic still-life shot of a luxury printed broadsheet newspaper lying open on a clean wooden studio desk. The newspaper features a prominent full-page print advertisement for ${spec.name}, featuring an ultra-clear, high-contrast studio photograph of the product (${spec.materials}), surrounded by authentic newsprint column layouts, classic serif editorial headlines reading "${spec.tagline}", and subtle halftone paper grain texture. Natural window daylight casting soft diagonal morning shadows across the paper. STRICT NEGATIVE: Absolutely NO people, NO hands holding the paper, NO readers, NO human faces. Empty still-life scene.`,
  },
  {
    id: 'social_post',
    name: 'Social Media Feed Showcase',
    label: 'Instagram & Social Mockup',
    iconName: 'Instagram',
    defaultAspectRatio: '1:1',
    category: 'digital',
    description: 'Immaculate square aesthetic social post with clean modern prop staging, organic textures, and dynamic soft lighting.',
    promptGuide: 'Modern social media aesthetic product still-life flat-lay with organic botanical or architectural props, sharp lighting.',
    defaultPrompt: (spec: ProductSpec) =>
      `An ultra-chic modern social media product photography post of ${spec.name} (${spec.materials}) arranged in a minimalist modern aesthetic still-life composition. Styled with subtle organic props, textured travertine stone, and gentle dappled sunlight casting elegant palm or foliage shadows across a clean backdrop in ${spec.primaryColor} and ${spec.secondaryColor} tones. Crisp macro focus on the product label and "${spec.logoDescription}". Contemporary design-forward curation. STRICT NEGATIVE: Absolutely NO people, NO hands, NO models, NO selfies, NO human silhouettes. Pure inanimate product art.`,
  },
  {
    id: 'subway',
    name: 'Subway Station Lightbox',
    label: 'Transit Station Poster',
    iconName: 'Train',
    defaultAspectRatio: '4:3',
    category: 'outdoor',
    description: 'Illuminated glass lightbox poster embedded in a sleek underground transit station with glossy ceramic tiles and ambient reflections.',
    promptGuide: 'Modern metro station platform wall with illuminated glass ad lightbox showcasing the brand.',
    defaultPrompt: (spec: ProductSpec) =>
      `A wide cinematic architectural shot inside a clean, ultra-modern underground transit station platform. Embedded into the glossy ceramic subway tile wall is a glowing illuminated glass lightbox advertising poster displaying ${spec.name} with the slogan "${spec.tagline}". Ambient neon transit lights and glossy floor reflections create rich depth. Modern industrial transit aesthetic. STRICT NEGATIVE: Absolutely NO people, NO commuters, NO passengers, NO train conductors, NO human bodies. Empty futuristic transit architecture.`,
  },
  {
    id: 'magazine',
    name: 'Glossy Magazine Spread',
    label: 'Luxury Editorial Spread',
    iconName: 'BookOpen',
    defaultAspectRatio: '4:3',
    category: 'print',
    description: 'Double-page spread in a heavy-weight luxury design magazine, featuring generous white space and editorial typography.',
    promptGuide: 'Open high-fashion or architecture magazine resting on a marble surface with an editorial product feature spread.',
    defaultPrompt: (spec: ProductSpec) =>
      `An overhead high-angle editorial still life of an open heavy-gloss luxury design and lifestyle magazine resting on a white Carrara marble surface. The double-page center spread features a hero full-bleed advertising feature of ${spec.name} (${spec.materials}) with the tagline "${spec.tagline}", minimalist luxury typography, and generous negative space. Soft ambient daylight with delicate glass vase reflections nearby. STRICT NEGATIVE: Absolutely NO people, NO hands turning pages, NO readers, NO human limbs. Pure editorial magazine flat-lay.`,
  },
  {
    id: 'storefront',
    name: 'Boutique Window Display',
    label: 'Storefront Vitrine',
    iconName: 'Store',
    defaultAspectRatio: '16:9',
    category: 'retail',
    description: 'High-end flagship boutique glass window showcase at dusk with warm directional spotlights and geometric pedestals.',
    promptGuide: 'Exterior view of a luxury retail glass storefront at night, product spotlighted on bespoke pedestal.',
    defaultPrompt: (spec: ProductSpec) =>
      `A striking nighttime exterior view looking through the pristine floor-to-ceiling glass of a high-end luxury flagship boutique storefront. In the center vitrine, ${spec.name} (${spec.materials}) is spotlighted on a bespoke sculptural geometric pedestal with warm museum-grade downlighting and sleek brass trim. Subtle reflections of the quiet evening street visible in the polished glass. High-end retail merchandising. STRICT NEGATIVE: Absolutely NO people, NO shoppers, NO store clerks, NO pedestrians on the street, NO human silhouettes. Pure architectural luxury retail display.`,
  },
  {
    id: 'merch_packaging',
    name: 'Merchandise & Packaging Suite',
    label: 'Branded Unboxing Set',
    iconName: 'Package',
    defaultAspectRatio: '1:1',
    category: 'retail',
    description: 'Complete branded collection mockup including rigid embossed gift box, canvas tote bag, ceramic tumbler, and stationary.',
    promptGuide: 'Tabletop flat-lay or arrangement of the product accompanied by custom embossed boxes, stationary, and branded merchandise.',
    defaultPrompt: (spec: ProductSpec) =>
      `A luxurious branding and unboxing suite flat-lay featuring ${spec.name} alongside a custom embossed rigid presentation gift box, a heavyweight organic canvas tote bag stamped with the logo "${spec.logoDescription}", a matte ceramic tumbler, and a foil-stamped brand card in ${spec.primaryColor} and ${spec.accentColor}. Arranged meticulously on a honed sandstone tabletop with soft warm natural studio lighting. STRICT NEGATIVE: Absolutely NO people, NO hands unboxing, NO human presence. Pure inanimate brand merchandise arrangement.`,
  },
  {
    id: 'web_hero',
    name: 'Digital Website Hero Banner',
    label: 'Web & E-Commerce Banner',
    iconName: 'Layout',
    defaultAspectRatio: '16:9',
    category: 'digital',
    description: 'Widescreen 16:9 digital flagship landing page hero showcase with dynamic atmospheric depth, subtle glow, and clean alignment.',
    promptGuide: 'Widescreen banner composition with product floating or staged with atmospheric gradient depth, space for web UI.',
    defaultPrompt: (spec: ProductSpec) =>
      `An expansive 16:9 widescreen commercial hero banner showcasing ${spec.name} (${spec.materials}) positioned with crisp dynamic depth against an atmospheric modern digital gradient background with subtle glass refraction and soft glowing particle mist in ${spec.primaryColor} and ${spec.accentColor} tones. Pristine 3D commercial lighting and immaculate surface reflections. STRICT NEGATIVE: Absolutely NO people, NO human models, NO faces, NO hands. Pure modern digital commercial product banner.`,
  },
];
