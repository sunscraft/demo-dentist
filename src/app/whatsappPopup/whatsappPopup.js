import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './whatsappPopup.module.css'; // Global ya specific CSS

const WhatsAppFloating = () => {
  // WhatsApp Configuration
  const phoneNumber = "917024934163"; 
  const message = "Hello Dr. Priya Sharma, I would like to inquire about dental services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.floatingWhatsApp}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={35} />
    </a>
  );
};

export default WhatsAppFloating;