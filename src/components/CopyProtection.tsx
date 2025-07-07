import { useEffect } from 'react';

const CopyProtection = () => {
  useEffect(() => {
    // Helper function to check if target is an input element
    const isInputElement = (target: EventTarget | null): boolean => {
      if (!target) return false;
      const element = target as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      return tagName === 'input' || 
             tagName === 'textarea' || 
             element.contentEditable === 'true' ||
             element.closest('input') !== null ||
             element.closest('textarea') !== null ||
             element.closest('[contenteditable="true"]') !== null;
    };

    // Disable right-click context menu (except on inputs)
    const handleContextMenu = (e: MouseEvent) => {
      if (isInputElement(e.target)) return; // Allow context menu on inputs
      e.preventDefault();
      return false;
    };

    // Disable text selection (except on inputs)
    const handleSelectStart = (e: Event) => {
      if (isInputElement(e.target)) return; // Allow selection on inputs
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts (except on inputs)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInputElement(e.target)) return; // Allow all keyboard shortcuts on inputs
      
      // Disable Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+S, Ctrl+U, F12, Ctrl+Shift+I, Ctrl+Shift+J
      if (
        (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 's' || e.key === 'u')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.shiftKey && e.key === 'K')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable drag and drop (except on inputs)
    const handleDragStart = (e: DragEvent) => {
      if (isInputElement(e.target)) return; // Allow drag on inputs (like selecting text)
      e.preventDefault();
      return false;
    };

    // Disable print
    const handleBeforePrint = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeprint', handleBeforePrint);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeprint', handleBeforePrint);
    };
  }, []);

  return null;
};

export default CopyProtection;