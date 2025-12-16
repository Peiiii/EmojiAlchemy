import React, { useState, useEffect } from 'react';
import { EmojiGrid } from './components/EmojiGrid';
import { ResultCard } from './components/ResultCard';
import { HistoryDrawer } from './components/HistoryDrawer';
import { fuseEmojis } from './services/geminiService';
import { AlchemyResult, HistoryItem } from './types';
import { Beaker, History, Stars, AlertCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [isFusing, setIsFusing] = useState(false);
  const [result, setResult] = useState<AlchemyResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmojiSelect = (emoji: string) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter(e => e !== emoji));
    } else if (selectedEmojis.length < 2) {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  const handleFuse = async () => {
    if (selectedEmojis.length !== 2) return;

    setIsFusing(true);
    setResult(null);
    setError(null);

    try {
      const alchemyResult = await fuseEmojis(selectedEmojis[0], selectedEmojis[1]);
      setResult(alchemyResult);
      
      const newHistoryItem: HistoryItem = {
        ...alchemyResult,
        id: uuidv4(),
        timestamp: Date.now(),
        parents: [selectedEmojis[0], selectedEmojis[1]]
      };
      
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (err) {
      setError("融合过程变得不稳定。请重试。");
    } finally {
      setIsFusing(false);
    }
  };

  const handleReset = () => {
    setSelectedEmojis([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0b0f19] text-white overflow-x-hidden selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="w-full max-w-4xl p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <Stars className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            表情包炼金术
          </h1>
        </div>
        <button 
          onClick={() => setIsHistoryOpen(true)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          title="查看历史记录"
        >
          <History size={24} />
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl px-4 flex flex-col items-center justify-start pt-4 pb-20 gap-8">
        
        {/* Fusion Chamber (Visual Display of selection) */}
        {!result && (
          <div className="w-full flex flex-col items-center gap-6 mt-8 animate-fade-in">
            <div className="flex items-center gap-4 sm:gap-8">
              {/* Slot 1 */}
              <div className={`
                w-24 h-24 sm:w-32 sm:h-32 rounded-3xl border-2 flex items-center justify-center text-5xl sm:text-6xl transition-all duration-500
                ${selectedEmojis[0] 
                  ? 'bg-slate-800 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] rotate-[-3deg]' 
                  : 'bg-slate-900/50 border-slate-800 border-dashed text-slate-700'
                }
              `}>
                {selectedEmojis[0] || '?'}
              </div>

              <div className="text-slate-600 font-bold text-2xl">+</div>

              {/* Slot 2 */}
              <div className={`
                w-24 h-24 sm:w-32 sm:h-32 rounded-3xl border-2 flex items-center justify-center text-5xl sm:text-6xl transition-all duration-500
                ${selectedEmojis[1] 
                  ? 'bg-slate-800 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] rotate-[3deg]' 
                  : 'bg-slate-900/50 border-slate-800 border-dashed text-slate-700'
                }
              `}>
                {selectedEmojis[1] || '?'}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleFuse}
              disabled={selectedEmojis.length !== 2 || isFusing}
              className={`
                group relative px-8 py-4 rounded-full font-bold text-lg tracking-wide transition-all duration-300
                flex items-center gap-3
                ${selectedEmojis.length === 2 
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-105' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }
              `}
            >
              {isFusing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>正在融合元素...</span>
                </>
              ) : (
                <>
                  <Beaker className={`${selectedEmojis.length === 2 ? 'animate-bounce-gentle' : ''}`} />
                  <span>融合元素</span>
                </>
              )}
              
              {/* Button Glow Effect */}
              {selectedEmojis.length === 2 && (
                <div className="absolute inset-0 rounded-full ring-2 ring-white/20 animate-ping opacity-50"></div>
              )}
            </button>
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-950/30 px-4 py-2 rounded-lg border border-red-900/50 animate-fade-in">
                <AlertCircle size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Result Display */}
        {result && !isFusing && (
          <ResultCard result={result} onReset={handleReset} />
        )}

        {/* Emoji Selector Grid */}
        {!result && (
          <div className="w-full flex flex-col gap-3 animate-fade-in delay-100">
             <div className="flex justify-between items-end px-2">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">选择素材</h2>
                <span className="text-xs text-slate-600">已选 {selectedEmojis.length}/2</span>
             </div>
             <EmojiGrid 
               onSelect={handleEmojiSelect} 
               selectedEmojis={selectedEmojis} 
               disabled={isFusing} 
             />
          </div>
        )}
      </main>

      {/* History Drawer */}
      <HistoryDrawer 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        history={history} 
      />

      {/* Overlay for Drawer */}
      {isHistoryOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsHistoryOpen(false)}
        />
      )}
    </div>
  );
};

export default App;