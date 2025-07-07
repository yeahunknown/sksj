
import { ReactNode } from 'react';
import Header from './Header';
import ContactButton from './ContactButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <ContactButton />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
