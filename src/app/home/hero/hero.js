import React from 'react';
import Image from 'next/image';
import styles from './hero.module.css';
import { FaWhatsapp } from 'react-icons/fa'; 
import Link from 'next/link';

const Hero = () => {
  // WhatsApp Configuration
  const phoneNumber = "917024934163"; 
  const message = "Hello Dr. Priya Sharma, I would like to inquire about dental services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className={styles.heroWrapper}>
      
      {/* Main Content Area */}
      <div className={styles.contentArea}>
        <div className={styles.textContainer}>
          <div className={styles.ratedBadge}>NOIDA'S TOP RATED DENTAL CLINIC</div>
          <h1 className={styles.title}>
            Transform Your <span className={styles.smileUnderline}>Smile</span> With Expert Care
          </h1>
          <p className={styles.subtitle}>
            Experience world-class dental treatments in a sanctuary of luxury and precision. We blend advanced technology with personalized care to create lasting smiles.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryCta}>Contact Us</button>
            <button className={styles.secondaryCta}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.playIcon}>
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              Virtual Tour
            </button>
          </div>
        </div>

        {/* Hero Image Section - Modals Removed */}
        <div className={styles.imageModalsContainer}>
          <div className={styles.imageBgCircle}></div>
          <div className={styles.dentistImageContainer}>
            <Image 
                src="/images/Gemini_Generated_Image_y2iobky2iobky2io.png"
                alt="Dr. Priya Sharma, Expert Dentist"
                width={500} 
                height={500} 
                className={styles.dentistPhoto}
                priority 
            />
          </div>
        </div>
      </div>

      {/* Quick Booking Form Section */}
      <div className={styles.bookingBarContainer}>
        <div className={styles.bookingBar}>
          <div className={styles.bookingHeader}>
            <span className={styles.boltIcon}>⚡</span>
            <span>Book in 30 Seconds</span>
          </div>
          
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>NAME</label>
              <input type="text" placeholder="Full Name" />
            </div>
            
            <div className={styles.inputGroup}>
              <label>PHONE</label>
              <input type="tel" placeholder="+91 00000 00000" />
            </div>

            <div className={styles.inputGroup}>
              <label>SERVICE</label>
              <select>
                <option>General Checkup</option>
                <option>Root Canal</option>
                <option>Teeth Whitening</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>DATE</label>
              <input type="date" />
            </div>

            <div className={styles.inputGroup}>
              <label>TIME SLOT</label>
              <select>
                <option>09:00 AM - 09:30 AM</option>
                <option>09:30 AM - 10:00 AM</option>
                <option>10:00 AM - 10:30 AM</option>
                <option>10:30 AM - 11:00 AM</option>
                <option>11:00 AM - 11:30 AM</option>
                <option>11:30 AM - 12:00 PM</option>
                <option>12:00 PM - 12:30 PM</option>
                <option>12:30 PM - 01:00 PM</option>
                <option>01:00 PM - 01:30 PM</option>
                <option>01:30 PM - 02:00 PM</option>
                <option>02:00 PM - 02:30 PM</option>
                <option>02:30 PM - 03:00 PM</option>
                <option>03:00 PM - 03:30 PM</option>
                <option>03:30 PM - 04:00 PM</option>
                <option>04:00 PM - 04:30 PM</option>
                <option>04:30 PM - 05:00 PM</option>
                <option>05:00 PM - 05:30 PM</option>
                <option>05:30 PM - 06:00 PM</option>
              </select>
            </div>

            <button className={styles.submitBookingBtn}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Icon */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.floatingWhatsApp}
      >
        <FaWhatsapp size={35} />
      </a>
    </div>
  );
};

export default Hero;