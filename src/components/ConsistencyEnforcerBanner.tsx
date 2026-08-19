import React from 'react';
import { ShieldCheck, UserX, Cpu, Lock, CheckCircle2, RefreshCw } from 'lucide-react';
import { ProductSpec } from '../types';

interface ConsistencyEnforcerBannerProps {
  product: ProductSpec;
  hasMasterShot: boolean;
  selectedModel: string;
}

export const ConsistencyEnforcerBanner: React.FC<ConsistencyEnforcerBannerProps> = ({
  product,
  hasMasterShot,
  selectedModel,
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-3.5 shadow-lg shadow-black/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Enforced Policies */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></div>
            <span>No Human Subjects: <strong className="text-emerald-400 font-semibold">Active</strong></span>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
            <span>Consistency Engine: <strong className="text-indigo-300 font-semibold">{hasMasterShot ? 'Anchored to Studio Shot' : 'Locked to Spec'}</strong></span>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
            <span>Output Resolution: <strong className="text-slate-200">4K UHD</strong></span>
          </div>
        </div>

        {/* Right: Color Swatches & Quick Anchor Tags */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Palette:</span>
          <div className="flex items-center gap-1.5 bg-slate-950/60 px-2 py-1 rounded-md border border-slate-800">
            <div
              className="h-3.5 w-3.5 rounded-full border border-slate-700 shadow-xs"
              style={{ backgroundColor: product.primaryColor }}
              title={`Primary: ${product.primaryColor}`}
            />
            <div
              className="h-3.5 w-3.5 rounded-full border border-slate-700 shadow-xs"
              style={{ backgroundColor: product.secondaryColor }}
              title={`Secondary: ${product.secondaryColor}`}
            />
            <div
              className="h-3.5 w-3.5 rounded-full border border-slate-700 shadow-xs"
              style={{ backgroundColor: product.accentColor }}
              title={`Accent: ${product.accentColor}`}
            />
          </div>
          {product.productAnchor && (
            <>
              <span className="hidden lg:inline text-slate-700">|</span>
              <span className="hidden lg:inline font-mono text-[11px] text-slate-400 truncate max-w-xs" title={product.productAnchor}>
                ⚓ {product.productAnchor.slice(0, 40)}...
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
