import { ProductSpec, CopyDeck } from '../types';

export interface PresetBrand {
  id: string;
  name: string;
  badge: string;
  spec: ProductSpec;
  copyDeck: CopyDeck;
}

export const PRESET_BRANDS: PresetBrand[] = [
  {
    id: 'lumina',
    name: 'LUMINA BOTANICS',
    badge: 'Luxury Skincare',
    spec: {
      name: 'Lumina Nocturne Serum',
      category: 'Luxury Botanical Skincare',
      description: 'A night restoration elixir infused with bioactive botanical extracts and crushed pearl mica.',
      materials: 'Heavy fluted amber borosilicate glass bottle, brushed champagne gold aluminum dropper cap, matte ivory embossed textured label.',
      primaryColor: '#D97706', // Amber Gold
      secondaryColor: '#1E293B', // Deep Slate
      accentColor: '#FDE68A', // Warm Pearl
      logoDescription: 'Minimalist geometric botanical leaf monogram with thin luxury serif lettering',
      tagline: 'Illumination Born in Silence',
      brandStory: 'Harnessing nocturnal flora that blooms under moonlight to regenerate cellular vitality without synthetic additives.',
      aestheticStyle: 'Ethereal organic luxury, warm cinematic shadows, sculptural negative space',
      productAnchor: 'An elegant fluted amber glass dropper bottle with a brushed champagne gold aluminum cap and embossed ivory label displaying the LUMINA leaf emblem, standing upright with warm golden backlighting.',
    },
    copyDeck: {
      headline: 'Awaken to Luminous Renewal',
      subhead: 'Pure Bio-Retinol Infused with Moonlight Botanical Extracts',
      bodyCopy: 'Formulated with cold-pressed bioactive botanicals to restore deep cellular elasticity overnight. 100% organic, cruelty-free, and crafted for timeless skin vitality.',
      callToAction: 'Discover Nocturne Renewal',
      hashtags: ['#LuminaBotanics', '#NocturneSerum', '#CleanLuxury', '#BotanicalRitual', '#OrganicGlow'],
    },
  },
  {
    id: 'kronos',
    name: 'KRONOS ZERO',
    badge: 'Precision Timepiece',
    spec: {
      name: 'Kronos Horizon Chronograph',
      category: 'Horology & Precision Watchmaking',
      description: 'A 40mm ultra-lightweight aerospace titanium solar chronograph watch engineered for extreme durability and minimalist design.',
      materials: 'Grade 5 brushed titanium case, anti-reflective sapphire crystal dome, obsidian matte carbon dial, terracotta orange chronograph second hand, dark charcoal woven sailcloth strap.',
      primaryColor: '#334155', // Titanium Charcoal
      secondaryColor: '#0F172A', // Obsidian Black
      accentColor: '#EA580C', // Terracotta Orange
      logoDescription: 'A sleek Greek Delta symbol integrated with an infinity hour circle and crisp modernist sans-serif typography',
      tagline: 'Time Engineered Beyond Measure',
      brandStory: 'Designed for the modern voyager who values uncompromising mechanical precision, industrial beauty, and zero excess.',
      aestheticStyle: 'Industrial luxury, clean architectural lines, sharp precision shadows, matte textures',
      productAnchor: 'A 40mm brushed Grade 5 titanium chronograph watch with a domed sapphire crystal, obsidian matte dial, terracotta orange second hand, and charcoal textured woven strap on a dark slate stone surface.',
    },
    copyDeck: {
      headline: 'Architect of Pure Precision',
      subhead: 'Aerospace Grade 5 Titanium. Infinite Solar Autonomy.',
      bodyCopy: 'Engineered from single-block forged titanium with an indestructible sapphire crystal face. Powered by continuous ambient solar capture for boundless journeys.',
      callToAction: 'Explore the Horizon Edition',
      hashtags: ['#KronosZero', '#HorizonChrono', '#TitaniumWatch', '#HorologyDesign', '#IndustrialLuxury'],
    },
  },
  {
    id: 'neo_pulse',
    name: 'NEO PULSE',
    badge: 'Cybernetic Energy',
    spec: {
      name: 'Neo Pulse Ion Matrix',
      category: 'Functional Cybernetic Beverage',
      description: 'A zero-sugar clean nootropic electrolyte beverage packed with adaptogens for laser cognitive focus.',
      materials: 'Stealth matte obsidian-black 330ml slim aluminum can, textured tactile UV grip finish, vibrant electric cyan circuit line motifs, electric cyan pull tab.',
      primaryColor: '#0284C7', // Electric Cyan
      secondaryColor: '#09090B', // Stealth Obsidian
      accentColor: '#38BDF8', // Neon Sky
      logoDescription: 'Angular geometric pulse wave inside an open hexagon with futuristic tech typography',
      tagline: 'Zero Crash. Total Neural Velocity.',
      brandStory: 'Formulated with clean neuro-adaptogens and lion mane mushrooms to unlock flow state without jitters or sugar spikes.',
      aestheticStyle: 'Sleek dark cyberpunk, crisp neon reflections, dramatic directional rim lighting, condensation water droplets',
      productAnchor: 'A sleek matte obsidian 330ml slim aluminum can with crisp electric cyan circuit line graphics and frosted condensation droplets, glowing subtle cyan rim lighting on a dark reflective surface.',
    },
    copyDeck: {
      headline: 'Ignite Your Neural Flow',
      subhead: 'Zero Sugar. Pure Cognitive Adaptogens & Rapid Ion Electrolytes.',
      bodyCopy: 'Experience uninterrupted mental clarity with clinically-backed botanical nootropics. Formulated for high-focus builders, thinkers, and nocturnal creators.',
      callToAction: 'Fuel Your Matrix',
      hashtags: ['#NeoPulse', '#NeuralVelocity', '#CleanEnergy', '#NootropicFocus', '#CyberpunkAesthetic'],
    },
  },
  {
    id: 'terra',
    name: 'TERRA ORIGIN',
    badge: 'Artisanal Coffee',
    spec: {
      name: 'Terra Single-Origin Geisha Cold Brew',
      category: 'Artisanal Specialty Coffee',
      description: 'A 24-hour slow-drip single-origin cold brew coffee with notes of bergamot, wild jasmine, and candied orange peel.',
      materials: 'Heavy antique ribbed amber apothecary glass bottle, tactile rough-torn kraft paper label, emerald green bottle neck dip wax seal, dark cork stopper.',
      primaryColor: '#78350F', // Warm Coffee Amber
      secondaryColor: '#064E3B', // Forest Emerald
      accentColor: '#D97706', // Golden Honey
      logoDescription: 'Hand-drawn woodcut botanical coffee branch illustration with elegant vintage slab typography',
      tagline: 'Slow Drip. Pure Mountain Soul.',
      brandStory: 'Sourced from high-altitude volcanic terraces in Huila and cold-dripped drop by drop for twenty-four hours to unlock delicate floral sweetness.',
      aestheticStyle: 'Tactile artisanal heritage, rustic warm morning light, natural linen and aged wood textures',
      productAnchor: 'A heavy ribbed amber apothecary glass cold brew bottle sealed with dark emerald green neck wax, featuring a tactile torn kraft paper label with woodcut botanical coffee illustration on a rustic wooden coffee bar.',
    },
    copyDeck: {
      headline: 'Twenty-Four Hours for One Sublime Drop',
      subhead: 'Single-Origin Volcanic Geisha. Steeped in Pure Mountain Spring Water.',
      bodyCopy: 'Harvested by hand at 1,900 meters elevation and extracted at near-freezing temperatures over a full day. Unsurpassed floral notes of jasmine and wild honey in every pour.',
      callToAction: 'Taste the Heritage Batch',
      hashtags: ['#TerraOrigin', '#GeishaColdBrew', '#ArtisanalCoffee', '#SlowCraft', '#SpecialtyCoffee'],
    },
  },
];
