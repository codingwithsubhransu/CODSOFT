
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { CaptionDisplay } from './components/CaptionDisplay';
import { ExampleImages } from './components/ExampleImages';
import { Footer } from './components/Footer';
import { generateCaptionFromImage } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
import type { FileDetails } from './types';

const App: React.FC = () => {
  const [fileDetails, setFileDetails] = useState<FileDetails | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleImageSelect = useCallback(async (selectedFile: File) => {
    setIsLoading(true);
    setCaption('');
    setError('');
    
    try {
      const generativePart = await fileToGenerativePart(selectedFile);
      setFileDetails({
        preview: URL.createObjectURL(selectedFile),
        name: selectedFile.name,
      });

      const generatedCaption = await generateCaptionFromImage(generativePart);
      setCaption(generatedCaption);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setFileDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleExampleSelect = useCallback(async (url: string) => {
    setIsLoading(true);
    setCaption('');
    setError('');
    setFileDetails({ preview: url, name: 'Example Image' });
    
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "example.jpg", { type: blob.type });
      
      const generativePart = await fileToGenerativePart(file);
      const generatedCaption = await generateCaptionFromImage(generativePart);
      setCaption(generatedCaption);

    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred while fetching the example image.');
        }
        setFileDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const handleClear = () => {
    setFileDetails(null);
    setCaption('');
    setError('');
    if(fileDetails?.preview) {
      URL.revokeObjectURL(fileDetails.preview);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col space-y-6">
            <ImageUploader onImageSelect={handleImageSelect} fileDetails={fileDetails} onClear={handleClear} />
            <ExampleImages onSelect={handleExampleSelect} isLoading={isLoading} />
          </div>
          <div className="mt-8 lg:mt-0">
            <CaptionDisplay caption={caption} isLoading={isLoading} error={error} hasImage={!!fileDetails} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
