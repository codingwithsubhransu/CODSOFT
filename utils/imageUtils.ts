
import type { GenerativePart } from '../types';

/**
 * Converts a File object to a base64 encoded string with a data URL prefix.
 * @param file The image file to convert.
 * @returns A promise that resolves to the base64 data URL.
 */
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Converts an image File object into the format required for a Gemini API request.
 * @param file The File object representing the image.
 * @returns A promise that resolves to a GenerativePart object.
 */
export async function fileToGenerativePart(file: File): Promise<GenerativePart> {
  const base64String = await toBase64(file);
  return {
    inlineData: {
      data: base64String.split(',')[1], // Remove the "data:mime/type;base64," prefix
      mimeType: file.type,
    },
  };
}
