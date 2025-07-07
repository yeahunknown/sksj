
import React, { forwardRef } from 'react';
import { Button } from './button';
import { X, Upload } from 'lucide-react';

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  imageUrl?: string;
  error?: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, onRemove, imageUrl, error }, ref) => {
    return (
      <div className="mt-2">
        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
          id="token-image"
        />
        
        {!imageUrl ? (
          <label
            htmlFor="token-image"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors glass"
          >
            <Upload className="w-8 h-8 mb-2 text-gray-400" />
            <span className="text-sm text-gray-400">Click to upload image</span>
            <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
          </label>
        ) : (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Token preview"
              className="w-full h-32 object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRemove}
              className="absolute top-2 right-2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
