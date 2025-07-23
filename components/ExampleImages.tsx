
import React from 'react';

interface ExampleImagesProps {
  onSelect: (url: string) => void;
  isLoading: boolean;
}

const examples = [
  { id: '1', url: 'https://picsum.photos/id/1018/800/600', alt: 'A majestic mountain range with a valley' },
  { id: '2', url: 'https://picsum.photos/id/1025/800/600', alt: 'A playful dog running on a beach' },
  { id: '3', url: 'https://picsum.photos/id/237/800/600', alt: 'A close-up of a black puppy' },
  { id: '4', url: 'https://picsum.photos/id/1062/800/600', alt: 'A delicious-looking plate of food' },
];

export const ExampleImages: React.FC<ExampleImagesProps> = ({ onSelect, isLoading }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-indigo-300 mb-3">Or try an example:</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => onSelect(example.url)}
            disabled={isLoading}
            className="rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <img 
              src={example.url} 
              alt={example.alt} 
              className="w-full h-24 object-cover transform group-hover:scale-110 group-focus:scale-110 transition-transform duration-300" 
            />
          </button>
        ))}
      </div>
    </div>
  );
};
