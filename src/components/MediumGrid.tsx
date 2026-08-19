import React, { useState } from 'react';
import { MEDIUMS } from '../data/mediums';
import { GeneratedShot, MediumConfig, MediumId, ProductSpec, CopyDeck } from '../types';
import { MediumCard } from './MediumCard';
import { Layers, Sparkles, Filter, CheckCircle2, Play } from 'lucide-react';

interface MediumGridProps {
  shots: Record<MediumId, GeneratedShot>;
  product: ProductSpec;
  copyDeck: CopyDeck;
  onGenerateShot: (mediumId: MediumId, customPrompt?: string) => Promise<void>;
  onInspectShot: (shot: GeneratedShot) => void;
  generatingIds: Set<string>;
}

export const MediumGrid: React.FC<MediumGridProps> = ({
  shots,
  product,
  copyDeck,
  onGenerateShot,
  onInspectShot,
  generatingIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter out master_packshot from the main grid since it has its own dedicated master hero view
  const mediumList = MEDIUMS.filter((m) => m.id !== 'master_packshot');

  const filteredMediums = mediumList.filter((m) => {
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  // Calculate completed count
  const completedCount = mediumList.filter((m) => shots[m.id]?.imageUrl).length;
  const totalCount = mediumList.length;

  return (
    <div className="space-y-6">
      {/* Top Header & Filter Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-bold text-white">
              2. Cross-Medium Campaign Renders
            </h2>
            <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
              {completedCount}/{totalCount} Completed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Consistent product visual identity transposed across diverse architectural & print environments with zero humans
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'all', label: 'All Mediums' },
            { id: 'outdoor', label: 'Outdoor & Transit' },
            { id: 'print', label: 'Print & Editorial' },
            { id: 'digital', label: 'Digital & Social' },
            { id: 'retail', label: 'Retail & Merch' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Medium Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMediums.map((config) => {
          const shot = shots[config.id] || {
            id: config.id,
            mediumId: config.id,
            mediumName: config.name,
            imageUrl: null,
            prompt: config.defaultPrompt(product),
            aspectRatio: config.defaultAspectRatio,
            status: 'idle',
          };

          const isGenerating = generatingIds.has(config.id);

          return (
            <MediumCard
              key={config.id}
              config={config}
              shot={shot}
              product={product}
              copyDeck={copyDeck}
              onGenerate={onGenerateShot}
              onInspect={onInspectShot}
              isGenerating={isGenerating}
            />
          );
        })}
      </div>
    </div>
  );
};
