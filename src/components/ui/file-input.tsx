
import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Upload } from 'lucide-react';

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  imageUrl: string;
  error: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, onRemove, imageUrl, error }, ref) => {
    const handleButtonClick = () => {
      if (ref && typeof ref === 'object' && ref.current) {
        ref.current.click();
      }
    };

    return (
      <div className="space-y-2">
        {!imageUrl ? (
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <div className="text-gray-400 mb-2">Click to upload an image</div>
            <Input
              ref={ref}
              type="file"
              accept="image/*"
              onChange={onChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleButtonClick}
              className="bg-gray-700 border-gray-600 hover:bg-gray-600"
            >
              Choose File
            </Button>
          </div>
        ) : (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Token preview"
              className="w-full h-32 object-cover rounded-lg border border-gray-600"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white border-red-500 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export { FileInput };
