import React from 'react';
import { AlchemyResult, Rarity } from '../types';
import { Sparkles, Zap, Info } from 'lucide-react';

interface ResultCardProps {
  result: AlchemyResult;
  onReset: () => void;
}

const getRarityColor = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.COMMON: return 'text-slate-400 border-slate-500 shadow-slate-500/20';
    case Rarity.RARE: return 'text-blue-400 border-blue-500 shadow-blue-500/30';
    case Rarity.EPIC: return 'text-purple-400 border-purple-500 shadow-purple-500/40';
    case Rarity.LEGENDARY: return 'text-amber-400 border-amber-500 shadow-amber-500/50';
    case Rarity.MYTHICAL: return 'text-rose-500 border-rose-500 shadow-rose-500/60';
    default: return 'text-white border-white';
  }
};

const getRarityBg = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.COMMON: return 'from-slate-800 to-slate-900';
    case Rarity.RARE: return 'from-blue-900 to-slate-900';
    case Rarity.EPIC: return 'from-purple-900 to-slate-900';
    case Rarity.LEGENDARY: return 'from-amber-900 to-slate-900';
    case Rarity.MYTHICAL: return 'from-rose-900 to-slate-900';
    default: return 'from-slate-800 to-slate-900';
  }
};

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const rarityClass = getRarityColor(result.rarity);
  const bgGradient = getRarityBg(result.rarity);

  return (
    <div className={`relative w-full max-w-md mx-auto animate-zoom-in overflow-hidden rounded-3xl border-2 ${rarityClass.split(' ')[1]} bg-gradient-to-br ${bgGradient} p-1 shadow-2xl`}>
      
      {/* Dynamic Background Glow based on generated color */}
      <div 
        className="absolute top-0 left-0 w-full h-1/2 opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: result.colorHex }}
      />

      <div className="relative bg-slate-950/80 backdrop-blur-sm rounded-[20px] p-6 flex flex-col items-center text-center h-full">
        
        {/* Header: Rarity & Category */}
        <div className="flex justify-between w-full mb-6">
          <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded border ${rarityClass}`}>
            {result.rarity}
          </span>
          <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1">
            <Sparkles size={12} /> {result.category}
          </span>
        </div>

        {/* Main Visual Circle */}
        <div 
          className="w-32 h-32 rounded-full mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-slate-800 relative group"
          style={{ 
            background: `radial-gradient(circle at 30% 30%, ${result.colorHex}, #000)`,
            boxShadow: `0 0 30px ${result.colorHex}40`
          }}
        >
          <div className="absolute inset-0 rounded-full bg-white opacity-5 animate-pulse"></div>
          <span className="text-5xl drop-shadow-lg filter grayscale-0 group-hover:scale-110 transition-transform duration-500">
             ✨
          </span>
        </div>

        {/* Name */}
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-2">
          {result.name}
        </h2>

        {/* Stats Bar */}
        <div className="w-full bg-slate-800/50 rounded-full h-2 mb-4 overflow-hidden border border-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out"
            style={{ width: `${result.powerLevel}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-xs text-slate-500 mb-4 font-mono">
          <span>能量强度</span>
          <span className="text-white font-bold">{result.powerLevel}/100</span>
        </div>

        {/* Description */}
        <p className="text-slate-300 leading-relaxed mb-6 italic border-l-2 border-slate-700 pl-4 text-left w-full">
          "{result.description}"
        </p>

        {/* Fun Fact */}
        <div className="bg-slate-900/50 rounded-lg p-3 w-full border border-slate-800 mb-6 text-sm text-slate-400 flex items-start gap-3 text-left">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <span>{result.funFact}</span>
        </div>

        {/* Action Button */}
        <button
          onClick={onReset}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
        >
          <Zap size={18} />
          再次炼成
        </button>
      </div>
    </div>
  );
};