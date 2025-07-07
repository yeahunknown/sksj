
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
      <div className="space-y-2">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer glass hover:border-white/30 transition-colors">
            {imageUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={imageUrl}
                  alt="Token preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  type="button"
                  onClick={onRemove}
                  className="absolute top-1 right-1 p-1 h-6 w-6 bg-red-500 hover:bg-red-600"
                  size="sm"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> token image
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            )}
            <input
              ref={ref}
              type="file"
              className="hidden"
              onChange={onChange}
              accept="image/*"
            />
          </label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export { FileInput };
