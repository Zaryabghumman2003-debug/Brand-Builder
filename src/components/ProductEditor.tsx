import React, { useState } from 'react';
import {
  Sparkles,
  Palette,
  Layers,
  Tag,
  Wand2,
  ChevronDown,
  ChevronUp,
  PackageCheck,
  Type,
  FileText,
  Anchor,
  HelpCircle,
} from 'lucide-react';
import { ProductSpec, CopyDeck } from '../types';

interface ProductEditorProps {
  product: ProductSpec;
  copyDeck: CopyDeck;
  onChangeProduct: (updated: Partial<ProductSpec>) => void;
  onChangeCopyDeck: (updated: Partial<CopyDeck>) => void;
  onEnhanceWithAI: () => Promise<void>;
  isEnhancing: boolean;
}

const COLOR_PRESETS = [
  { name: 'Amber Gold', primary: '#D97706', secondary: '#1E293B', accent: '#FDE68A' },
  { name: 'Titanium Obsidian', primary: '#334155', secondary: '#0F172A', accent: '#EA580C' },
  { name: 'Cyber Cyan', primary: '#0284C7', secondary: '#09090B', accent: '#38BDF8' },
  { name: 'Forest Emerald', primary: '#064E3B', secondary: '#78350F', accent: '#D97706' },
  { name: 'Nordic Clay', primary: '#A16207', secondary: '#F5F5F4', accent: '#44403C' },
  { name: 'Velvet Plum', primary: '#581C87', secondary: '#18181B', accent: '#E879F9' },
  { name: 'Monochrome Noir', primary: '#18181B', secondary: '#F4F4F5', accent: '#71717A' },
];

export const ProductEditor: React.FC<ProductEditorProps> = ({
  product,
  copyDeck,
  onChangeProduct,
  onChangeCopyDeck,
  onEnhanceWithAI,
  isEnhancing,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'visual' | 'identity' | 'copy'>('visual');

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-xl overflow-hidden transition-all">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              {product.name ? product.name : 'Describe Your Product'}
            </h2>
            <p className="text-xs text-slate-400">
              {product.category || 'Define physical form, materials, color palette & identity'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Auto-Enhance Button */}
          <button
            id="ai-enhance-blueprint-btn"
            type="button"
            onClick={onEnhanceWithAI}
            disabled={isEnhancing || !product.name}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-xs font-semibold text-white shadow-md shadow-indigo-900/40 hover:bg-indigo-500 disabled:opacity-50 transition-all cursor-pointer"
            title="Use Gemini to generate rich physical descriptions, prompt blueprints, and advertising copy"
          >
            {isEnhancing ? (
              <>
                <Sparkles className="h-3.5 w-3.5 animate-spin text-indigo-200" />
                <span>Crafting Blueprint...</span>
              </>
            ) : (
              <>
                <Wand2 className="h-3.5 w-3.5 text-indigo-200" />
                <span>Auto-Enhance Specs</span>
              </>
            )}
          </button>

          {/* Toggle Accordion */}
          <button
            id="toggle-editor-btn"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'visual'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="h-3.5 w-3.5" />
              Physical Form & Colors
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('identity')}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'identity'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tag className="h-3.5 w-3.5" />
              Brand & Anchor Spec
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('copy')}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'copy'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              Campaign Copy Deck
            </button>
          </div>

          {/* TAB 1: Physical Form & Colors */}
          {activeTab === 'visual' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Product Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                    Product / Brand Name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    id="product-name-input"
                    type="text"
                    value={product.name}
                    onChange={(e) => onChangeProduct({ name: e.target.value })}
                    placeholder="e.g. Lumina Nocturne Serum"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                    Product Category
                  </label>
                  <input
                    id="product-category-input"
                    type="text"
                    value={product.category}
                    onChange={(e) => onChangeProduct({ category: e.target.value })}
                    placeholder="e.g. Luxury Botanical Skincare / Titanium Watch / Beverage"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Materials & Tactile Finishes */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                  Materials, Packaging Form & Textures (Crucial for consistency across shots)
                </label>
                <textarea
                  id="product-materials-input"
                  rows={2}
                  value={product.materials}
                  onChange={(e) => onChangeProduct({ materials: e.target.value })}
                  placeholder="e.g. Fluted amber borosilicate glass bottle, brushed champagne gold aluminum cap, textured matte ivory label..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              {/* Color Palette Section */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Palette className="h-3.5 w-3.5 text-indigo-400" />
                    Color Palette (Preserved Across Every Medium)
                  </span>
                  {/* Preset color themes */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500">Themes:</span>
                    {COLOR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          onChangeProduct({
                            primaryColor: preset.primary,
                            secondaryColor: preset.secondary,
                            accentColor: preset.accent,
                          })
                        }
                        title={preset.name}
                        className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-700 overflow-hidden hover:scale-110 transition-transform"
                      >
                        <div className="flex h-full w-full">
                          <div className="w-1/2 h-full" style={{ backgroundColor: preset.primary }} />
                          <div className="w-1/2 h-full" style={{ backgroundColor: preset.accent }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* Primary Color */}
                  <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 p-2">
                    <input
                      id="primary-color-input"
                      type="color"
                      value={product.primaryColor || '#D97706'}
                      onChange={(e) => onChangeProduct({ primaryColor: e.target.value })}
                      className="h-7 w-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Primary Tone</div>
                      <input
                        type="text"
                        value={product.primaryColor}
                        onChange={(e) => onChangeProduct({ primaryColor: e.target.value })}
                        className="w-full text-xs font-mono font-medium text-slate-200 uppercase bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Secondary Color */}
                  <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 p-2">
                    <input
                      id="secondary-color-input"
                      type="color"
                      value={product.secondaryColor || '#1E293B'}
                      onChange={(e) => onChangeProduct({ secondaryColor: e.target.value })}
                      className="h-7 w-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Secondary / Base</div>
                      <input
                        type="text"
                        value={product.secondaryColor}
                        onChange={(e) => onChangeProduct({ secondaryColor: e.target.value })}
                        className="w-full text-xs font-mono font-medium text-slate-200 uppercase bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 p-2">
                    <input
                      id="accent-color-input"
                      type="color"
                      value={product.accentColor || '#FDE68A'}
                      onChange={(e) => onChangeProduct({ accentColor: e.target.value })}
                      className="h-7 w-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Highlight / Accent</div>
                      <input
                        type="text"
                        value={product.accentColor}
                        onChange={(e) => onChangeProduct({ accentColor: e.target.value })}
                        className="w-full text-xs font-mono font-medium text-slate-200 uppercase bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Brand Identity & Consistency Anchor */}
          {activeTab === 'identity' && (
            <div className="space-y-4">
              {/* Product Consistency Anchor Text */}
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                    <Anchor className="h-3.5 w-3.5 text-indigo-400" />
                    Product Consistency Anchor Blueprint
                  </span>
                  <span className="text-[11px] text-indigo-400/80 font-medium">Injected into all medium prompts</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  This description explicitly locks the physical form, materials, and geometry so the Nano-Banana model renders the exact same product whether on a highway billboard, newspaper, or social flat-lay.
                </p>
                <textarea
                  id="product-anchor-input"
                  rows={2}
                  value={product.productAnchor}
                  onChange={(e) => onChangeProduct({ productAnchor: e.target.value })}
                  placeholder="e.g. An elegant fluted amber glass dropper bottle with a brushed champagne gold aluminum cap and embossed ivory label..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/90 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Logo & Emblem Description */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                    Logo / Emblem Motif Description
                  </label>
                  <input
                    id="logo-description-input"
                    type="text"
                    value={product.logoDescription}
                    onChange={(e) => onChangeProduct({ logoDescription: e.target.value })}
                    placeholder="e.g. Minimalist geometric botanical leaf monogram with serif lettering"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Aesthetic Style & Mood */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                    Aesthetic Vibe & Lighting Direction
                  </label>
                  <input
                    id="aesthetic-style-input"
                    type="text"
                    value={product.aestheticStyle}
                    onChange={(e) => onChangeProduct({ aestheticStyle: e.target.value })}
                    placeholder="e.g. Organic minimalist luxury, warm architectural shadows, crisp studio highlights"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                  Brand Tagline / Campaign Slogan
                </label>
                <input
                  id="tagline-input"
                  type="text"
                  value={product.tagline}
                  onChange={(e) => onChangeProduct({ tagline: e.target.value })}
                  placeholder="e.g. Illumination Born in Silence"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                />
              </div>

              {/* Brand Story */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                  Brand Story & Positioning Statement
                </label>
                <textarea
                  id="brand-story-input"
                  rows={2}
                  value={product.brandStory}
                  onChange={(e) => onChangeProduct({ brandStory: e.target.value })}
                  placeholder="Brief 2-sentence brand narrative..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Campaign Copy Deck */}
          {activeTab === 'copy' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                    Primary Campaign Headline
                  </label>
                  <input
                    type="text"
                    value={copyDeck.headline}
                    onChange={(e) => onChangeCopyDeck({ headline: e.target.value })}
                    placeholder="e.g. Awaken to Luminous Renewal"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                    Sub-Headline (Print & Social)
                  </label>
                  <input
                    type="text"
                    value={copyDeck.subhead}
                    onChange={(e) => onChangeCopyDeck({ subhead: e.target.value })}
                    placeholder="e.g. Pure Bio-Retinol Infused with Botanical Extracts"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                  Editorial Body Copy (For Newspaper & Magazine mockups)
                </label>
                <textarea
                  rows={2}
                  value={copyDeck.bodyCopy}
                  onChange={(e) => onChangeCopyDeck({ bodyCopy: e.target.value })}
                  placeholder="2-3 sentences of persuasive advertising body copy..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                    Call To Action
                  </label>
                  <input
                    type="text"
                    value={copyDeck.callToAction}
                    onChange={(e) => onChangeCopyDeck({ callToAction: e.target.value })}
                    placeholder="e.g. Discover the Collection"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">
                    Hashtags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={copyDeck.hashtags?.join(', ') || ''}
                    onChange={(e) =>
                      onChangeCopyDeck({
                        hashtags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    placeholder="#BrandName, #LuxuryDesign, #CleanBeauty"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
