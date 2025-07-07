import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ContactPopup from './ContactPopup';

const ContactButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="fixed top-6 right-6 z-40">
        <Button
          onClick={() => setShowPopup(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 animate-pulse"
        >
          Contact
        </Button>
      </div>

      <ContactPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </>
  );
};

export default ContactButton;