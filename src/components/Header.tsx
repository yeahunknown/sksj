
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import ContactPopup from './ContactPopup';

const Header = () => {
  const location = useLocation();
  const [showContactPopup, setShowContactPopup] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Create Token', path: '/create' },
    { name: 'Add Liquidity', path: '/liquidity' },
  ];

  return (
    <header className="glass border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://i.ibb.co/8nVTNNzh/Omnipad.png" 
              alt="Omnipad" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gradient">Omnipad</span>
          </Link>

          <nav className="flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                    location.pathname === item.path
                      ? 'text-blue-400'
                      : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowContactPopup(true)}
              className="glass border-white/20 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
            >
              Contact
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      <ContactPopup 
        isOpen={showContactPopup} 
        onClose={() => setShowContactPopup(false)} 
      />
    </header>
  );
};

export default Header;
