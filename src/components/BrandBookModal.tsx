import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  Layers,
  Palette,
  FileText,
  Lock,
  Tag,
  Eye,
} from 'lucide-react';
import { ProductSpec, CopyDeck, GeneratedShot, MediumId } from '../types';
import { MEDIUMS } from '../data/mediums';

interface BrandBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductSpec;
  copyDeck: CopyDeck;
  shots: Record<MediumId, GeneratedShot>;
  onInspectShot: (shot: GeneratedShot) => void;
}

export const BrandBookModal: React.FC<BrandBookModalProps> = ({
  isOpen,
  onClose,
  product,
  copyDeck,
  shots,
  onInspectShot,
}) => {
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const validShots = (Object.values(shots) as GeneratedShot[]).filter((s) => s.imageUrl);

  const handleCopyMarkdown = () => {
    const md = `# ${product.name || 'Brand Product'} — Brand Campaign & Visual Deck
**Category:** ${product.category || 'Consumer Product'}
**Tagline:** "${product.tagline || 'Brand Tagline'}"

## Brand Story & Positioning
${product.brandStory || 'No story provided.'}

## Visual Anchor & Materials
- **Materials & Form:** ${product.materials || 'N/A'}
- **Color Palette:** Primary (${product.primaryColor}), Secondary (${product.secondaryColor}), Accent (${product.accentColor})
- **Logo Motif:** ${product.logoDescription || 'N/A'}
- **Aesthetic Vibe:** ${product.aestheticStyle || 'N/A'}
- **Consistency Blueprint:** ${product.productAnchor || 'N/A'}

## Campaign Copy Deck
- **Lead Headline:** ${copyDeck.headline || 'N/A'}
- **Sub-Headline:** ${copyDeck.subhead || 'N/A'}
- **Editorial Body:** ${copyDeck.bodyCopy || 'N/A'}
- **Call to Action:** ${copyDeck.callToAction || 'N/A'}
- **Hashtags:** ${copyDeck.hashtags?.join(' ') || 'N/A'}

## Generated Cross-Medium Shots (${validShots.length} mediums)
${validShots.map((s) => `- **${s.mediumName}** (${s.aspectRatio}): Generated with Nano-Banana`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 text-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-md shadow-indigo-900/40">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {product.name || 'Brand'} — Visual Identity & Campaign Deck
              </h2>
              <p className="text-xs text-slate-400">Complete Brand Style Guide & Medium Showcase</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              {copiedText ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedText ? 'Copied Deck' : 'Copy Markdown Deck'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950/40">
          {/* Hero Section */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
                  {product.category || 'Consumer Goods'}
                </span>
                <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">
                  {product.name || 'Untitled Brand'}
                </h1>
              </div>
              {product.tagline && (
                <div className="rounded-lg bg-slate-950 text-indigo-300 font-serif italic px-3 py-1.5 text-xs border border-slate-800">
                  "{product.tagline}"
                </div>
              )}
            </div>

            {product.brandStory && (
              <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-indigo-500 pl-3">
                {product.brandStory}
              </p>
            )}

            {/* Colors */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-indigo-400" />
                Brand Color Palette
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/80 p-2.5">
                  <div
                    className="h-9 w-9 rounded-lg border border-slate-700 shadow-xs"
                    style={{ backgroundColor: product.primaryColor }}
                  />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Primary Tone</div>
                    <div className="text-xs font-mono font-bold text-slate-200">{product.primaryColor}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/80 p-2.5">
                  <div
                    className="h-9 w-9 rounded-lg border border-slate-700 shadow-xs"
                    style={{ backgroundColor: product.secondaryColor }}
                  />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Secondary Tone</div>
                    <div className="text-xs font-mono font-bold text-slate-200">{product.secondaryColor}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/80 p-2.5">
                  <div
                    className="h-9 w-9 rounded-lg border border-slate-700 shadow-xs"
                    style={{ backgroundColor: product.accentColor }}
                  />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Highlight / Accent</div>
                    <div className="text-xs font-mono font-bold text-slate-200">{product.accentColor}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Blueprint & Anchor Specs */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-400" />
              Physical Form & Consistency Blueprint
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 space-y-1">
                <span className="font-semibold text-slate-300">Materials & Tactile Textures</span>
                <p className="text-slate-400 leading-relaxed">{product.materials || 'Not specified'}</p>
              </div>

              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 space-y-1">
                <span className="font-semibold text-slate-300">Logo & Emblem Geometry</span>
                <p className="text-slate-400 leading-relaxed">{product.logoDescription || 'Not specified'}</p>
              </div>
            </div>

            {product.productAnchor && (
              <div className="rounded-lg bg-indigo-950/20 border border-indigo-500/30 p-3 text-xs space-y-1">
                <span className="font-semibold text-indigo-300">Consistency Anchor Directive:</span>
                <p className="text-slate-300 leading-relaxed">{product.productAnchor}</p>
              </div>
            )}
          </div>

          {/* Copy Deck */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-indigo-400" />
              Campaign Advertising Copy Deck
            </h3>

            <div className="space-y-3 text-xs">
              <div className="border-b border-slate-800 pb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">Lead Headline</span>
                <div className="text-sm font-bold text-white mt-0.5">{copyDeck.headline || 'N/A'}</div>
              </div>

              <div className="border-b border-slate-800 pb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">Sub-Headline</span>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">{copyDeck.subhead || 'N/A'}</div>
              </div>

              <div className="border-b border-slate-800 pb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">Editorial Body Copy</span>
                <div className="text-xs text-slate-300 leading-relaxed mt-0.5">{copyDeck.bodyCopy || 'N/A'}</div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Call to Action</span>
                  <div className="font-semibold text-indigo-400">{copyDeck.callToAction || 'N/A'}</div>
                </div>

                {copyDeck.hashtags && copyDeck.hashtags.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Campaign Hashtags</span>
                    <div className="font-mono text-slate-400">{copyDeck.hashtags.join(' ')}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Generated Medium Gallery */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                Rendered Medium Showcase ({validShots.length} Mockups)
              </h3>
            </div>

            {validShots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {validShots.map((shot) => (
                  <div
                    key={shot.mediumId}
                    onClick={() => {
                      onClose();
                      onInspectShot(shot);
                    }}
                    className="group relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xs hover:border-slate-700 cursor-pointer transition-all aspect-square"
                  >
                    <img
                      src={shot.imageUrl!}
                      alt={shot.mediumName}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5 text-white">
                      <div className="text-xs font-bold leading-tight">{shot.mediumName}</div>
                      <div className="text-[10px] text-indigo-300 font-mono">{shot.aspectRatio}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-xs text-slate-500">
                No medium mockups rendered yet. Use the campaign generator to create shots across billboards, newspapers, social feeds, and more!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
