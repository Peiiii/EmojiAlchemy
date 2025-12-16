import { GoogleGenAI, Type } from "@google/genai";
import { AlchemyResult, Rarity } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fuseEmojis = async (emoji1: string, emoji2: string): Promise<AlchemyResult> => {
  const modelId = "gemini-2.5-flash"; // Fast and creative
  
  const systemPrompt = `
    你是一位拥有无尽智慧的炼金术大师。你的任务是将两个 Emoji（概念素材）融合，创造出一个全新的、虚构的、富有创意的“造物”。
    它可以是一个生物、一件魔法神器、一个未来科技装置，或者一个哲学概念。
    
    请发挥想象力！不要只是简单描述组合，要去发明创造！
    例如：🔥 + ❄️ = "霜火水晶" (一种燃烧着冰冷火焰的水晶)。
    例如：🤖 + 🧠 = "初醒芯片" (人工智能产生自我意识的瞬间)。
    
    根据组合的强大程度或奇异程度来决定【稀有度】。
    生成一个代表这个新造物本质的十六进制颜色代码。
    
    请务必使用中文（简体）生成所有文本内容。
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `融合这两个元素: ${emoji1} 和 ${emoji2}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "创造物的创意名称 (中文)" },
            description: { type: Type.STRING, description: "简短且富有氛围感的描述 (中文，不超过2句话)" },
            category: { type: Type.STRING, description: "例如：神器、生物、事件、概念" },
            rarity: { type: Type.STRING, enum: Object.values(Rarity) },
            powerLevel: { type: Type.NUMBER, description: "1 到 100 之间" },
            colorHex: { type: Type.STRING, description: "代表该物品的十六进制颜色代码" },
            funFact: { type: Type.STRING, description: "关于它的一个简短、机智或神秘的趣闻 (中文)" }
          },
          required: ["name", "description", "category", "rarity", "powerLevel", "colorHex", "funFact"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AlchemyResult;
    } else {
      throw new Error("No text returned from Gemini");
    }
  } catch (error) {
    console.error("Alchemy failed:", error);
    // Fallback in case of severe API error to avoid crashing UI
    return {
      name: "不稳定的物质",
      description: "融合失败了，只留下一堆灰色的残渣。",
      category: "废弃物",
      rarity: Rarity.COMMON,
      powerLevel: 1,
      colorHex: "#555555",
      funFact: "或许你可以稍后再试。"
    };
  }
};