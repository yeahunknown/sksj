
import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
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
      <div className="space-y-2">
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
              className="w-24 h-24 rounded-lg object-cover border border-white/20"
            />
            <Button
              type="button"
              onClick={onRemove}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor="file-input"
            className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors"
          >
            <Upload className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">Upload</span>
          </label>
        )}
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
