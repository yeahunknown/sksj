
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
              className="glass border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm font-medium flex items-center gap-2 bg-gray-900/50 text-white hover:text-white active:text-white focus:text-white"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
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
