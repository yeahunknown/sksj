
import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onRemove?: () => void;
  imageUrl?: string;
  error?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, type, onRemove, imageUrl, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {imageUrl ? (
          <div className="relative">
            <img
              src={imageUrl}
              alt="Token preview"
              className="w-full h-32 object-cover rounded-md border border-input"
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <input
            type="file"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            accept="image/*"
            {...props}
          />
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
