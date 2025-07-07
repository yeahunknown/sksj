
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-white font-bold text-xl">Omnipad</span>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link 
              to="/terms" 
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/security" 
              className="hover:text-white transition-colors"
            >
              Security Policy
            </Link>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
          <p>
            © 2024 Omnipad. All rights reserved. Use at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
