import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Maximize2,
  Download,
  Copy,
  Check,
  Cpu,
  Lock,
  Camera,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { GeneratedShot, ProductSpec } from '../types';

interface MasterHeroShotProps {
  shot: GeneratedShot;
  product: ProductSpec;
  onGenerate: (mediumId: 'master_packshot', customPrompt?: string) => Promise<void>;
  onInspect: (shot: GeneratedShot) => void;
  isGenerating: boolean;
  selectedModel: string;
}

export const MasterHeroShot: React.FC<MasterHeroShotProps> = ({
  shot,
  product,
  onGenerate,
  onInspect,
  isGenerating,
  selectedModel,
}) => {
  const [promptText, setPromptText] = useState(shot.prompt);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync prompt if changed from props
  React.useEffect(() => {
    setPromptText(shot.prompt);
  }, [shot.prompt]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptText || shot.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!shot.imageUrl) return;
    const a = document.createElement('a');
    a.href = shot.imageUrl;
    a.download = `${product.name ? product.name.toLowerCase().replace(/\s+/g, '-') : 'product'}-master-packshot.png`;
    a.click();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 text-slate-100 p-4 sm:p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Image Canvas & Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div
            onClick={() => shot.imageUrl && onInspect(shot)}
            className={`group relative aspect-square w-full max-w-sm rounded-xl overflow-hidden border-2 transition-all ${
              shot.imageUrl
                ? 'border-indigo-500/50 bg-slate-950 shadow-2xl cursor-pointer hover:border-indigo-400'
                : 'border-slate-800 bg-slate-950/80'
            }`}
          >
            {shot.imageUrl ? (
              <>
                <img
                  src={shot.imageUrl}
                  alt={product.name || 'Master Packshot'}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspect(shot);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold hover:scale-110 transition-transform shadow-lg shadow-indigo-900/50"
                    title="Fullscreen Lightbox"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors shadow-lg border border-slate-700"
                    title="Download PNG"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>

                {/* Badge */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-slate-950/80 px-2.5 py-1 text-[11px] font-medium text-indigo-300 backdrop-blur-md border border-indigo-500/30">
                  <Lock className="h-3 w-3 text-indigo-400" />
                  <span>Master Anchor Locked</span>
                </div>
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                {isGenerating ? (
                  <div className="space-y-3">
                    <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                      <Sparkles className="h-7 w-7 animate-spin" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-indigo-300">Rendering with Nano-Banana...</p>
                      <p className="text-xs text-slate-400">Crafting studio lighting & material textures</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-500 border border-slate-800">
                      <Camera className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-300">No Studio Packshot Yet</p>
                      <p className="text-xs text-slate-500 max-w-xs">
                        Generate your pristine studio shot first to lock in the product identity
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {shot.error && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="h-4 w-4" />
              <span>{shot.error}</span>
            </div>
          )}
        </div>

        {/* Right Column: Controls, Specs & Prompt Directives (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 items-center rounded bg-indigo-600 px-2 text-xs font-bold uppercase tracking-wider text-white">
                Anchor Shot
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                1. Master Studio Commercial Packshot
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Cpu className="h-3.5 w-3.5 text-indigo-400" />
              <span>{selectedModel === 'gemini-3.1-flash-lite-image' ? 'Nano-Banana' : 'Nano-Banana 2 HD'}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The studio packshot defines the core visual geometry, textures, and color grades. Once generated, this exact product is transposed across outdoor billboards, newspapers, subways, and social feeds with zero humans.
          </p>

          {/* Prompt Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Prompt Directive (Nano-Banana Engine)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingPrompt(!isEditingPrompt)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline"
                >
                  {isEditingPrompt ? 'Close Editor' : 'Edit Prompt'}
                </button>
              </div>
            </div>

            {isEditingPrompt ? (
              <textarea
                rows={3}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200 font-mono focus:border-indigo-500 focus:outline-none"
              />
            ) : (
              <p className="text-xs text-slate-400 font-mono leading-relaxed line-clamp-3">
                {promptText || shot.prompt}
              </p>
            )}

            <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
              <span className="text-emerald-400 font-semibold">🔒 Negative Constraint Enforced:</span>
              <span>Strictly zero people, models, or human hands.</span>
            </div>
          </div>

          {/* Action Generate / Regenerate */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              id="generate-master-shot-btn"
              type="button"
              onClick={() => onGenerate('master_packshot', isEditingPrompt ? promptText : undefined)}
              disabled={isGenerating || !product.name}
              className="flex h-11 items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Generating Master Studio Shot...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>{shot.imageUrl ? 'Regenerate Studio Shot' : 'Generate Master Studio Shot'}</span>
                </>
              )}
            </button>

            {shot.imageUrl && (
              <button
                type="button"
                onClick={() => onInspect(shot)}
                className="flex h-11 items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Maximize2 className="h-4 w-4 text-indigo-400" />
                <span>Inspect High-Res</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
