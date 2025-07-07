
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  imageUrl?: string;
  error?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, onRemove, imageUrl, error }, ref) => {
    return (
      <div className="space-y-2">
        {imageUrl ? (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Token preview"
              className="w-24 h-24 rounded-lg object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={onRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <input
              ref={ref}
              type="file"
              accept="image/*"
              onChange={onChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
            >
              Click to upload image
            </label>
          </div>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export default FileInput;
