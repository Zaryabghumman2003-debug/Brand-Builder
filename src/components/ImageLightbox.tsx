import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { GeneratedShot, ProductSpec, CopyDeck } from '../types';
import { MockupOverlay } from './MockupOverlay';

interface ImageLightboxProps {
  shot: GeneratedShot | null;
  allShots: GeneratedShot[];
  product: ProductSpec;
  copyDeck: CopyDeck;
  onClose: () => void;
  onSelectShot: (shot: GeneratedShot) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  shot,
  allShots,
  product,
  copyDeck,
  onClose,
  onSelectShot,
}) => {
  const [copied, setCopied] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  if (!shot || !shot.imageUrl) return null;

  const validShots = allShots.filter((s) => s.imageUrl);
  const currentIndex = validShots.findIndex((s) => s.mediumId === shot.mediumId);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (validShots.length === 0) return;
    const nextIdx = (currentIndex + 1) % validShots.length;
    onSelectShot(validShots[nextIdx]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (validShots.length === 0) return;
    const prevIdx = (currentIndex - 1 + validShots.length) % validShots.length;
    onSelectShot(validShots[prevIdx]);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(shot.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!shot.imageUrl) return;
    const a = document.createElement('a');
    a.href = shot.imageUrl;
    const slug = product.name ? product.name.toLowerCase().replace(/\s+/g, '-') : 'product';
    a.download = `${slug}-${shot.mediumId}-highres.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Main Container */}
      <div className="relative flex flex-col lg:flex-row max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
        {/* Left: Big Image Viewport */}
        <div className="relative flex flex-1 items-center justify-center bg-black p-4 min-h-[350px] sm:min-h-[500px]">
          <div className="relative max-h-[75vh] max-w-full overflow-hidden rounded-lg shadow-2xl">
            <img
              src={shot.imageUrl}
              alt={shot.mediumName}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto max-w-full object-contain"
            />

            {showOverlay && (
              <MockupOverlay
                mediumId={shot.mediumId}
                product={product}
                copyDeck={copyDeck}
              />
            )}
          </div>

          {/* Navigation Arrows */}
          {validShots.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/90 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors backdrop-blur-xs border border-slate-700"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/90 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors backdrop-blur-xs border border-slate-700"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Right: Metadata & Prompt Inspector */}
        <div className="w-full lg:w-96 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900 p-5 text-slate-100 overflow-y-auto max-h-[85vh]">
          <div className="space-y-4">
            {/* Title & Badge */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Medium Showcase
                </span>
                <span className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                  {shot.aspectRatio}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">{shot.mediumName}</h2>
              <p className="text-xs text-slate-400">{product.name || 'Brand Product'}</p>
            </div>

            {/* Model & Consistency Policy */}
            <div className="space-y-2 rounded-xl bg-slate-950 p-3 border border-slate-800 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-indigo-400" />
                  Model Engine:
                </span>
                <span className="font-semibold text-indigo-300">Nano-Banana</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-emerald-400" />
                  No People Rule:
                </span>
                <span className="font-semibold text-emerald-400">Enforced</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-indigo-400" />
                  Product Anchor:
                </span>
                <span className="font-semibold text-indigo-300">Preserved</span>
              </div>
            </div>

            {/* Prompt inspector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Full Prompt Payload</span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>
              <div className="rounded-lg bg-slate-950 p-3 font-mono text-[11px] text-slate-300 border border-slate-800 leading-relaxed max-h-48 overflow-y-auto">
                {shot.prompt}
              </div>
            </div>

            {/* Frame overlay toggle */}
            <div className="flex items-center justify-between pt-1 text-xs text-slate-300">
              <span>Medium Frame Overlay</span>
              <button
                type="button"
                onClick={() => setShowOverlay(!showOverlay)}
                className="text-xs font-semibold text-indigo-400 hover:underline"
              >
                {showOverlay ? 'Hide Frame' : 'Show Frame'}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-500 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download High-Res PNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
