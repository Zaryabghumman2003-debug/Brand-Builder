import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Maximize2,
  Download,
  Copy,
  Check,
  Eye,
  EyeOff,
  Edit3,
  CheckCircle2,
  AlertCircle,
  ImageIcon,
} from 'lucide-react';
import { GeneratedShot, MediumConfig, ProductSpec, CopyDeck } from '../types';
import { MockupOverlay } from './MockupOverlay';

interface MediumCardProps {
  config: MediumConfig;
  shot: GeneratedShot;
  product: ProductSpec;
  copyDeck: CopyDeck;
  onGenerate: (mediumId: any, customPrompt?: string) => Promise<void>;
  onInspect: (shot: GeneratedShot) => void;
  isGenerating: boolean;
}

export const MediumCard: React.FC<MediumCardProps> = ({
  config,
  shot,
  product,
  copyDeck,
  onGenerate,
  onInspect,
  isGenerating,
}) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [promptText, setPromptText] = useState(shot.prompt);
  const [copied, setCopied] = useState(false);

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
    const slug = product.name ? product.name.toLowerCase().replace(/\s+/g, '-') : 'brand';
    a.download = `${slug}-${config.id}-mockup.png`;
    a.click();
  };

  // Determine aspect ratio class
  const getAspectClass = (ar: string) => {
    switch (ar) {
      case '16:9':
        return 'aspect-video';
      case '3:4':
        return 'aspect-[3/4]';
      case '4:3':
        return 'aspect-[4/3]';
      case '9:16':
        return 'aspect-[9/16]';
      case '1:1':
      default:
        return 'aspect-square';
    }
  };

  return (
    <div
      id={`medium-card-${config.id}`}
      className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md shadow-lg hover:border-slate-700 hover:shadow-xl transition-all overflow-hidden"
    >
      {/* Top Card Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white">{config.name}</h3>
            {shot.imageUrl && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                <CheckCircle2 className="h-3 w-3" />
                Done
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 line-clamp-1">{config.description}</p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-300">
            {config.defaultAspectRatio}
          </span>
        </div>
      </div>

      {/* Media Canvas Area */}
      <div
        onClick={() => shot.imageUrl && onInspect(shot)}
        className={`relative w-full ${getAspectClass(
          config.defaultAspectRatio
        )} bg-slate-950 flex items-center justify-center overflow-hidden transition-all ${
          shot.imageUrl ? 'cursor-pointer' : ''
        }`}
      >
        {shot.imageUrl ? (
          <>
            <img
              src={shot.imageUrl}
              alt={`${config.name} Mockup`}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Realistic Medium Frame Overlay */}
            {showOverlay && (
              <MockupOverlay
                mediumId={config.id}
                product={product}
                copyDeck={copyDeck}
              />
            )}

            {/* Hover Action Strip */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onInspect(shot);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white hover:scale-110 transition-transform shadow-lg shadow-indigo-900/50"
                title="View High-Res Lightbox"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700 transition-colors shadow-lg border border-slate-700"
                title="Download PNG"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
            {isGenerating ? (
              <div className="space-y-2">
                <Sparkles className="mx-auto h-8 w-8 animate-spin text-indigo-400" />
                <p className="text-xs font-semibold text-indigo-300">Rendering {config.label}...</p>
                <p className="text-[11px] text-slate-400">Locking consistency & zero humans</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <ImageIcon className="mx-auto h-8 w-8 text-slate-600" />
                <p className="text-xs font-medium text-slate-400">Not generated yet</p>
                <p className="text-[11px] text-slate-500 max-w-xs">{config.promptGuide}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Footer & Prompt Controls */}
      <div className="flex flex-1 flex-col justify-between p-3.5 space-y-3 bg-slate-900/60 border-t border-slate-800">
        {/* Error message */}
        {shot.error && (
          <div className="flex items-center gap-1.5 rounded-lg bg-rose-950/50 border border-rose-800/60 p-2 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span className="line-clamp-2">{shot.error}</span>
          </div>
        )}

        {/* Prompt section */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setIsEditingPrompt(!isEditingPrompt)}
              className="flex items-center gap-1 font-medium text-slate-400 hover:text-indigo-300 transition-colors"
            >
              <Edit3 className="h-3 w-3" />
              <span>{isEditingPrompt ? 'Close Editor' : 'Customize Medium Prompt'}</span>
            </button>

            <div className="flex items-center gap-2">
              {shot.imageUrl && (
                <button
                  type="button"
                  onClick={() => setShowOverlay(!showOverlay)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                  title="Toggle realistic frame overlay"
                >
                  {showOverlay ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  <span>{showOverlay ? 'Hide Frame' : 'Show Frame'}</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {isEditingPrompt ? (
            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-xs font-mono text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
          ) : (
            <p className="text-[11px] text-slate-400 font-mono line-clamp-2 leading-relaxed">
              {promptText || shot.prompt}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
          <button
            id={`generate-btn-${config.id}`}
            type="button"
            onClick={() => onGenerate(config.id, isEditingPrompt ? promptText : undefined)}
            disabled={isGenerating || !product.name}
            className="flex-1 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 text-xs font-semibold text-white shadow-md shadow-indigo-900/30 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-indigo-200" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-indigo-200" />
                <span>{shot.imageUrl ? 'Regenerate Medium' : `Generate ${config.label}`}</span>
              </>
            )}
          </button>

          {shot.imageUrl && (
            <button
              type="button"
              onClick={() => onInspect(shot)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Fullscreen Inspect"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
