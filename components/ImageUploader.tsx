
import React, { useCallback, useState } from 'react';
import type { FileDetails } from '../types';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  fileDetails: FileDetails | null;
  onClear: () => void;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, fileDetails, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  }, [onImageSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  if (fileDetails) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl relative">
        <h2 className="text-xl font-semibold text-indigo-300 mb-4">Your Image</h2>
        <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
          <img src={fileDetails.preview} alt={fileDetails.name} className="w-full h-full object-contain" />
        </div>
        <button
          onClick={onClear}
          className="absolute top-4 right-4 bg-red-600/80 hover:bg-red-500 text-white rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
          aria-label="Remove image"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
       <h2 className="text-xl font-semibold text-indigo-300 mb-4">Upload an Image</h2>
        <label
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-400 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700/50'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon className={`w-10 h-10 mb-3 text-gray-400 ${isDragging ? 'text-indigo-300' : ''}`} />
            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-indigo-300">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 10MB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
        </label>
    </div>
  );
};
