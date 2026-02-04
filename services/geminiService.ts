
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeAndCategorize = async (text: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Hãy tóm tắt và phân loại nội dung sau đây thành các chủ đề chính. Trình bày dưới dạng Markdown chuyên nghiệp: ${text}`,
  });
  return response.text;
};

export const generateImage = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Không thể tạo hình ảnh");
};

export const generateCode = async (prompt: string, language: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Hãy viết mã nguồn bằng ngôn ngữ ${language} cho yêu cầu sau: ${prompt}. Kèm theo giải thích chi tiết và các gợi ý tối ưu hóa.`,
    config: { thinkingConfig: { thinkingBudget: 16000 } }
  });
  return response.text;
};

export const generateCreativeContent = async (prompt: string, genre: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Viết một kịch bản hoặc truyện ngắn thể loại ${genre} dựa trên ý tưởng: ${prompt}`,
  });
  return response.text;
};

export const searchAndResearch = async (query: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: { tools: [{ googleSearch: {} }] },
  });
  
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter(chunk => chunk.web)
    .map(chunk => ({ title: chunk.web?.title || 'Nguồn', uri: chunk.web?.uri || '' })) || [];

  return { text: response.text, sources };
};

export const textToSpeech = async (text: string, voice: string = 'Kore') => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

export const generateVideo = async (prompt: string, model: 'veo-3.1-fast-generate-preview' | 'veo-3.1-generate-preview' = 'veo-3.1-fast-generate-preview') => {
  const ai = getAI();
  let operation = await ai.models.generateVideos({
    model,
    prompt,
    config: { resolution: '720p', aspectRatio: '16:9' }
  });
  
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const analyzeTasks = async (tasks: any[]) => {
  const ai = getAI();
  const taskString = JSON.stringify(tasks);
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Dưới đây là danh sách công việc: ${taskString}. Hãy đưa ra các đề xuất cụ thể để tối ưu hóa thời gian và năng suất làm việc.`,
  });
  return response.text;
};
