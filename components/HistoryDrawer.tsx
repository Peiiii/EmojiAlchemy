import React from 'react';
import { HistoryItem } from '../types';
import { X, Clock } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ isOpen, onClose, history }) => {
  return (
    <div 
      className={`fixed inset-y-0 right-0 w-80 bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 transform transition-transform duration-300 ease-in-out z-50 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock size={20} className="text-indigo-400" /> 
          探索日志
        </h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-64px)] p-4 space-y-4">
        {history.length === 0 ? (
          <div className="text-center text-slate-500 mt-10">
            <p>暂无发现。</p>
            <p className="text-sm mt-2">开始融合，填充你的炼金手记吧！</p>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-lg p-3 hover:border-slate-600 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-2 text-xl bg-slate-950 rounded px-2 py-1">
                  <span>{item.parents[0]}</span>
                  <span className="text-slate-600 text-sm flex items-center">+</span>
                  <span>{item.parents[1]}</span>
                </div>
                <span className="text-xs px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">{item.rarity}</span>
              </div>
              <h4 className="font-bold text-slate-200">{item.name}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.description}</p>
              <div className="mt-2 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                    className="h-full" 
                    style={{ width: `${item.powerLevel}%`, backgroundColor: item.colorHex }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};