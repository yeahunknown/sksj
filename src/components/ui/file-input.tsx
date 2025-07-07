
import React, { forwardRef } from 'react';
import { Button } from './button';
import { X, Upload } from 'lucide-react';

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  imageUrl?: string;
  error?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, onRemove, imageUrl, error }, ref) => {
    return (
      <div className="mt-2">
        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
          id="file-input"
        />
        
        {imageUrl ? (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Token preview"
              className="w-32 h-32 object-cover rounded-lg border border-white/20"
            />
            <Button
              type="button"
              onClick={onRemove}
              className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-500 hover:bg-red-600 rounded-full"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor="file-input"
            className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors"
          >
            <div className="text-center">
              <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <span className="text-sm text-gray-400">Upload Image</span>
            </div>
          </label>
        )}
        
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
