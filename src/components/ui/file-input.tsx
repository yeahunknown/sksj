
import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface FileInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  onRemove?: () => void;
  imageUrl?: string;
  error?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onRemove, imageUrl, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
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
        {imageUrl && (
          <div className="relative inline-block">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-16 h-16 object-cover rounded-lg border border-white/20"
            />
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
