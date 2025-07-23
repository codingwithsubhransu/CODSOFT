
import React from 'react';

interface CaptionDisplayProps {
  caption: string;
  isLoading: boolean;
  error: string;
  hasImage: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
    <div className="h-4 bg-gray-700 rounded"></div>
    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
  </div>
);

const WandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);


const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CaptionDisplay: React.FC<CaptionDisplayProps> = ({ caption, isLoading, error, hasImage }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-red-400 bg-red-900/30 p-6 rounded-lg">
          <ErrorIcon className="w-12 h-12 mb-4" />
          <p className="font-semibold">Generation Failed</p>
          <p className="text-sm text-red-300 mt-1">{error}</p>
        </div>
      );
    }
    if (caption) {
      return (
        <p className="text-lg leading-relaxed whitespace-pre-wrap">{caption}</p>
      );
    }
    if (hasImage) {
        return <p className="text-gray-400">Caption will appear here...</p>;
    }
    return (
      <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
         <WandIcon className="w-16 h-16 mb-4 text-gray-600"/>
        <p>Upload an image to generate a caption.</p>
        <p className="text-sm">The AI-generated description will appear here.</p>
      </div>
    );
  };
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl h-full min-h-[200px] flex flex-col">
      <h2 className="text-xl font-semibold text-indigo-300 mb-4 flex items-center">
        <WandIcon className="w-6 h-6 mr-2"/>
        AI-Generated Caption
      </h2>
      <div className="flex-grow text-gray-200">
        {renderContent()}
      </div>
    </div>
  );
};
