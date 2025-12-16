import React from 'react';
import { EMOJI_LIST } from '../types';

interface EmojiGridProps {
  onSelect: (emoji: string) => void;
  selectedEmojis: string[];
  disabled: boolean;
}

export const EmojiGrid: React.FC<EmojiGridProps> = ({ onSelect, selectedEmojis, disabled }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-700 shadow-inner max-h-60 overflow-y-auto">
      {EMOJI_LIST.map((emoji) => {
        const isSelected = selectedEmojis.includes(emoji);
        return (
          <button
            key={emoji}
            onClick={() => !disabled && onSelect(emoji)}
            disabled={disabled || (selectedEmojis.length >= 2 && !isSelected)}
            className={`
              text-3xl p-3 rounded-xl transition-all duration-300
              flex items-center justify-center
              ${isSelected 
                ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)] scale-110 border-2 border-indigo-400' 
                : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 hover:scale-105'
              }
              ${(disabled || (selectedEmojis.length >= 2 && !isSelected)) ? 'opacity-40 cursor-not-allowed grayscale' : 'cursor-pointer'}
            `}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
};