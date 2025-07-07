import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showToast?: boolean;
  toastMessage?: string;
}

const CopyButton = ({ 
  text, 
  onCopy, 
  className = "", 
  variant = "outline", 
  size = "sm",
  showToast = true,
  toastMessage = "Copied to clipboard"
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      if (showToast) {
        toast({
          title: toastMessage
        });
      }
      
      if (onCopy) {
        onCopy();
      }
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={variant}
      size={size}
      className={className}
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </Button>
  );
};

export default CopyButton;