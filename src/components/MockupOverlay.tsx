import React from 'react';
import { MediumId, ProductSpec, CopyDeck } from '../types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles, MapPin } from 'lucide-react';

interface MockupOverlayProps {
  mediumId: MediumId;
  product: ProductSpec;
  copyDeck: CopyDeck;
}

export const MockupOverlay: React.FC<MockupOverlayProps> = ({ mediumId, product, copyDeck }) => {
  if (mediumId === 'social_post') {
    return (
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 text-white text-xs bg-gradient-to-b from-black/50 via-transparent to-black/80">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full border border-white/50 bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
              {product.name ? product.name.charAt(0).toUpperCase() : 'B'}
            </div>
            <div>
              <span className="font-semibold text-xs tracking-tight drop-shadow-md">
                @{product.name ? product.name.toLowerCase().replace(/\s+/g, '') : 'brand'}
              </span>
              <span className="ml-1 text-[10px] text-indigo-300 font-normal">Sponsored</span>
            </div>
          </div>
          <MoreHorizontal className="h-4 w-4 drop-shadow-md opacity-80" />
        </div>

        {/* Bottom Engagement & Caption */}
        <div className="space-y-1.5 drop-shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-4 w-4 fill-white/80" />
              <MessageCircle className="h-4 w-4" />
              <Send className="h-4 w-4" />
            </div>
            <Bookmark className="h-4 w-4" />
          </div>
          <div className="text-[11px] leading-tight line-clamp-2">
            <strong className="mr-1">{product.name || 'Brand'}</strong>
            <span className="opacity-95">{product.tagline || copyDeck.headline}</span>
          </div>
          {copyDeck.hashtags && copyDeck.hashtags.length > 0 && (
            <div className="text-[10px] text-indigo-200/90 font-mono line-clamp-1">
              {copyDeck.hashtags.slice(0, 3).join(' ')}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (mediumId === 'newspaper') {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-0 border-b border-stone-800/30 bg-stone-100/85 backdrop-blur-xs px-3 py-1.5 text-stone-900">
        <div className="flex items-center justify-between border-b border-stone-400/50 pb-0.5 text-[9px] font-serif uppercase tracking-widest text-stone-600">
          <span>THE DAILY CHRONICLE • SPECIAL EDITION</span>
          <span>EST. 1924 • PRINTED IN THE METROPOLIS</span>
        </div>
        <div className="flex items-center justify-between pt-0.5">
          <span className="font-serif font-black text-xs sm:text-sm tracking-tight text-stone-900">
            {copyDeck.headline || product.tagline || 'EXCEPTIONAL CRAFTSMANSHIP'}
          </span>
          <span className="text-[10px] font-mono font-bold bg-stone-900 text-stone-50 px-1.5 py-0.2 rounded-xs">
            ADVERTISEMENT
          </span>
        </div>
      </div>
    );
  }

  if (mediumId === 'billboard') {
    return (
      <div className="pointer-events-none absolute inset-0 border-4 border-slate-800 shadow-inner">
        {/* Steel catwalk framing badge */}
        <div className="absolute bottom-1 right-2 rounded bg-slate-950/90 px-2 py-0.5 font-mono text-[9px] text-indigo-400 border border-slate-700">
          CLEAR CHANNEL OUTDOOR • HIGHWAY 101
        </div>
        <div className="absolute top-1 left-2 flex items-center gap-1 rounded bg-slate-950/90 px-2 py-0.5 text-[9px] text-slate-300 font-medium border border-slate-800">
          <MapPin className="h-2.5 w-2.5 text-indigo-400" />
          <span>METRO OVERPASS ELEVATION</span>
        </div>
      </div>
    );
  }

  if (mediumId === 'subway') {
    return (
      <div className="pointer-events-none absolute inset-0 border-3 border-slate-700 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20">
        <div className="absolute top-2 right-2 rounded bg-indigo-600 text-white font-bold px-1.5 py-0.5 text-[9px] tracking-wider shadow-sm">
          MTA PLATFORM DISPLAY
        </div>
      </div>
    );
  }

  if (mediumId === 'magazine') {
    return (
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 text-slate-900">
        <div className="flex items-center justify-between text-[10px] font-serif tracking-widest text-slate-900 uppercase bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
          <span>VOLUME 48 • ARCHITECTURAL LUXURY</span>
          <span>FOLIO 082</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono tracking-widest text-slate-800 bg-white/90 px-1.5 py-0.5 rounded shadow-xs">
            SPECIAL COMMERCIAL FEATURE
          </span>
        </div>
      </div>
    );
  }

  if (mediumId === 'storefront') {
    return (
      <div className="pointer-events-none absolute inset-0 border border-slate-800/60">
        <div className="absolute bottom-2 left-2 rounded bg-slate-950/90 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-serif tracking-widest backdrop-blur-xs">
          FLAGSHIP BOUTIQUE • 5TH AVENUE
        </div>
      </div>
    );
  }

  return null;
};
