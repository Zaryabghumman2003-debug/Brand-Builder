export interface ProductSpec {
  name: string;
  category: string;
  description: string;
  materials: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoDescription: string;
  tagline: string;
  brandStory: string;
  aestheticStyle: string;
  productAnchor: string;
}

export type MediumId =
  | 'master_packshot'
  | 'billboard'
  | 'newspaper'
  | 'social_post'
  | 'subway'
  | 'magazine'
  | 'storefront'
  | 'merch_packaging'
  | 'web_hero';

export interface MediumConfig {
  id: MediumId;
  name: string;
  label: string;
  iconName: string;
  defaultAspectRatio: '1:1' | '16:9' | '3:4' | '4:3' | '9:16';
  category: 'outdoor' | 'print' | 'digital' | 'retail' | 'core';
  description: string;
  promptGuide: string;
  defaultPrompt: (spec: ProductSpec) => string;
}

export interface CopyDeck {
  headline: string;
  subhead: string;
  bodyCopy: string;
  callToAction: string;
  hashtags: string[];
}

export interface GeneratedShot {
  id: string;
  mediumId: MediumId;
  mediumName: string;
  imageUrl: string | null;
  prompt: string;
  aspectRatio: '1:1' | '16:9' | '3:4' | '4:3' | '9:16';
  status: 'idle' | 'generating' | 'completed' | 'error';
  error?: string;
  timestamp?: number;
  modelUsed?: string;
  customNotes?: string;
}

export interface CampaignState {
  product: ProductSpec;
  copyDeck: CopyDeck;
  shots: Record<MediumId, GeneratedShot>;
  selectedModel: 'gemini-3.1-flash-lite-image' | 'gemini-3.1-flash-image';
}
