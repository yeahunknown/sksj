
import { ReactNode } from 'react';
import Header from './Header';
import CopyProtection from './CopyProtection';
import XSSProtection from './XSSProtection';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground select-none">
      <CopyProtection />
      <XSSProtection />
      <Header />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
