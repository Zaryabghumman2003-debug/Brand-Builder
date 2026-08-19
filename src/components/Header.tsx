import React from 'react';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  Download,
  RotateCcw,
  Zap,
  BookOpen,
  Cpu,
} from 'lucide-react';
import { PRESET_BRANDS } from '../data/presets';
import { ProductSpec, CopyDeck } from '../types';

interface HeaderProps {
  onSelectPreset: (presetId: string) => void;
  onReset: () => void;
  onOpenBrandBook: () => void;
  onBatchGenerateAll: () => void;
  isBatchGenerating: boolean;
  selectedModel: 'gemini-3.1-flash-lite-image' | 'gemini-3.1-flash-image';
  onChangeModel: (model: 'gemini-3.1-flash-lite-image' | 'gemini-3.1-flash-image') => void;
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectPreset,
  onReset,
  onOpenBrandBook,
  onBatchGenerateAll,
  isBatchGenerating,
  selectedModel,
  onChangeModel,
  completedCount,
  totalCount,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/80 text-slate-200 backdrop-blur-md shadow-lg shadow-black/20">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-md shadow-indigo-900/40">
            <span className="text-base tracking-tight">B</span>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-lg font-semibold tracking-tight text-white">
                BrandBuilder <span className="text-slate-500 font-normal text-base">Studio</span>
              </span>
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/90 px-2.5 py-0.5 rounded-full border border-slate-700 text-xs">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[11px] font-medium text-slate-300">
                  {selectedModel === 'gemini-3.1-flash-lite-image' ? 'Nano-Banana v2.4' : 'Nano-Banana 2 HD'}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Cross-medium product visualization & consistency studio
            </p>
          </div>
        </div>

        {/* Action Controls & Presets */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Preset Selector */}
          <div className="relative">
            <select
              id="preset-brand-selector"
              onChange={(e) => {
                if (e.target.value) {
                  onSelectPreset(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="h-9 rounded-lg border border-slate-700 bg-slate-800/90 px-3 pr-8 text-xs font-medium text-slate-200 hover:border-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-colors"
            >
              <option value="" disabled>
                ⚡ Load Inspiration Preset...
              </option>
              {PRESET_BRANDS.map((b) => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-slate-200">
                  {b.name} ({b.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Model Switcher */}
          <div className="hidden md:flex items-center rounded-lg border border-slate-700 bg-slate-800/80 p-0.5 text-xs">
            <button
              id="model-btn-lite"
              type="button"
              onClick={() => onChangeModel('gemini-3.1-flash-lite-image')}
              className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                selectedModel === 'gemini-3.1-flash-lite-image'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Nano-Banana (gemini-3.1-flash-lite-image)"
            >
              Nano-Banana
            </button>
            <button
              id="model-btn-full"
              type="button"
              onClick={() => onChangeModel('gemini-3.1-flash-image')}
              className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                selectedModel === 'gemini-3.1-flash-image'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Nano-Banana 2 (gemini-3.1-flash-image - Ultra HD)"
            >
              Nano-Banana 2 HD
            </button>
          </div>

          {/* Brand Book Drawer Trigger */}
          <button
            id="brand-book-btn"
            type="button"
            onClick={onOpenBrandBook}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden md:inline">Brand Deck &</span> Kit
          </button>

          {/* Batch Generate Full Campaign Button */}
          <button
            id="batch-generate-all-btn"
            type="button"
            onClick={onBatchGenerateAll}
            disabled={isBatchGenerating}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 text-xs font-semibold text-white shadow-lg shadow-indigo-900/30 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isBatchGenerating ? (
              <>
                <Sparkles className="h-3.5 w-3.5 animate-spin" />
                <span>Generating Campaign...</span>
              </>
            ) : (
              <>
                <Zap className="h-3.5 w-3.5 fill-current text-indigo-200" />
                <span>Generate Full Campaign ({completedCount}/{totalCount})</span>
              </>
            )}
          </button>

          {/* Reset button */}
          <button
            id="reset-form-btn"
            type="button"
            onClick={onReset}
            title="Reset to blank product"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
