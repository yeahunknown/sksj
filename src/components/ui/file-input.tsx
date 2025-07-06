
import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
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
          <div className="relative inline-block">
            <img
              src={imageUrl}
              alt="Token preview"
              className="w-24 h-24 rounded-lg object-cover border border-white/20"
            />
            <Button
              type="button"
              onClick={onRemove}
              size="sm"
              variant="destructive"
              className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors glass"
          >
            <Upload className="w-8 h-8 text-white/60 mb-2" />
            <span className="text-sm text-white/60">Click to upload image</span>
            <span className="text-xs text-white/40">Max 5MB</span>
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
