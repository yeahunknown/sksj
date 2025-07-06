
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
        {imageUrl && (
          <div className="relative inline-block">
            <img 
              src={imageUrl} 
              alt="Token preview" 
              className="w-20 h-20 rounded-lg object-cover border border-white/20"
            />
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            )}
          </div>
        )}
        <input
          type="file"
          className={cn(
            "flex h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          accept="image/*"
          {...props}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
