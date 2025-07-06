
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
          id="image-upload"
        />
        
        {imageUrl ? (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Token preview"
              className="w-20 h-20 rounded-lg object-cover border border-white/20"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-400">Click to upload image</span>
            <span className="text-xs text-gray-500">Max 5MB</span>
          </label>
        )}
        
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export { FileInput };
