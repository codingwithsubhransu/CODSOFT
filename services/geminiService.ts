
import { GoogleGenAI } from '@google/genai';
import type { GenerativePart } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set. Please add it to your environment.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateCaptionFromImage(imagePart: GenerativePart): Promise<string> {
  const textPart = {
    text: "You are an expert at analyzing images. Your task is to provide a detailed, engaging, and descriptive caption for the following image. Describe the main subject, the setting, any notable actions, and the overall mood or atmosphere of the scene. Be concise but evocative.",
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, imagePart] },
    });

    return response.text.trim();
  } catch (error) {
    console.error('Error generating caption from Gemini API:', error);
    if (error instanceof Error) {
        if(error.message.includes('API key not valid')) {
            throw new Error('The provided API Key is not valid. Please check your environment configuration.');
        }
         throw new Error(`Failed to generate caption: ${error.message}`);
    }
    throw new Error('An unknown error occurred while communicating with the Gemini API.');
  }
}
