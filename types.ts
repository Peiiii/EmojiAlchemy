export enum Rarity {
  COMMON = '普通',
  RARE = '稀有',
  EPIC = '史诗',
  LEGENDARY = '传说',
  MYTHICAL = '神话'
}

export interface AlchemyResult {
  name: string;
  description: string;
  category: string;
  rarity: Rarity;
  powerLevel: number; // 0-100
  colorHex: string;
  funFact: string;
}

export interface HistoryItem extends AlchemyResult {
  id: string;
  timestamp: number;
  parents: [string, string];
}

export const EMOJI_LIST = [
  '🔥', '💧', '🌲', '⚡', '🌪️', '❄️', '🌞', '🌑', 
  '🦁', '🐲', '🦄', '👽', '🤖', '👻', '💀', '🧠',
  '👁️', '💎', '⚔️', '🛡️', ' potion', '📜', '⚗️', '🔮',
  '🚀', '🎨', '🎵', '🍔', '🌵', '🌋', '🍄', '🦠'
];