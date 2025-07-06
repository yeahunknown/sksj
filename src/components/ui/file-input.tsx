
import React, { forwardRef } from 'react';
import { Button } from './button';
import { X, Upload } from 'lucide-react';

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  imageUrl?: string;
  error?: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, onRemove, imageUrl, error }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition-colors">
            {imageUrl ? (
              <div className="relative w-full h-full">
                <img src={imageUrl} alt="Token preview" className="w-full h-full object-cover rounded-lg" />
                {onRemove && (
                  <Button
                    type="button"
                    onClick={onRemove}
                    className="absolute top-2 right-2 w-6 h-6 p-0 bg-red-500 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </label>
          <input
            ref={ref}
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onChange}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
