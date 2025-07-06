
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
        <div className="flex items-center gap-4">
          <input
            ref={ref}
            type="file"
            accept="image/*"
            onChange={onChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            Choose Image
          </label>
          {imageUrl && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRemove}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Remove
            </Button>
          )}
        </div>
        {imageUrl && (
          <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/20">
            <img
              src={imageUrl}
              alt="Token preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
