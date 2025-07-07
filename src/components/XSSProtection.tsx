import { useEffect } from 'react';

const XSSProtection = () => {
  useEffect(() => {
    // Add CSP meta tag
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;";
    document.head.appendChild(cspMeta);

    // Add X-Frame-Options
    const frameMeta = document.createElement('meta');
    frameMeta.httpEquiv = 'X-Frame-Options';
    frameMeta.content = 'DENY';
    document.head.appendChild(frameMeta);

    // Add X-Content-Type-Options
    const contentTypeMeta = document.createElement('meta');
    contentTypeMeta.httpEquiv = 'X-Content-Type-Options';
    contentTypeMeta.content = 'nosniff';
    document.head.appendChild(contentTypeMeta);

    // Sanitize inputs
    const sanitizeInput = (str: string) => {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    };

    // Monitor for script injection attempts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'SCRIPT' && !element.hasAttribute('data-allowed')) {
                element.remove();
                console.warn('Potential XSS attempt blocked');
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Override dangerous functions (simplified for compatibility)
    const originalConsoleLog = console.log;
    console.log = function(...args: any[]) {
      // Allow normal console.log but monitor for suspicious patterns
      const message = args.join(' ');
      if (message.includes('<script') || message.includes('javascript:')) {
        console.warn('Suspicious content detected in console.log');
        return;
      }
      return originalConsoleLog(...args);
    };

    // Cleanup
    return () => {
      observer.disconnect();
      console.log = originalConsoleLog;
    };
  }, []);

  return null;
};

export default XSSProtection;