
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <img 
              src="https://i.ibb.co/8nVTNNzh/Omnipad.png" 
              alt="Omnipad" 
              className="w-6 h-6"
            />
            <span className="font-semibold text-gradient">Omnipad</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/security" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Security
            </Link>
          </div>
          
          <div className="text-sm text-gray-400">
            © 2024 Omnipad. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
