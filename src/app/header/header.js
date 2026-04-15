"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // Form ke liye state
  const phoneNumber = "+917024934163";

  return (
    <div className={styles.headerContainer}>
      {/* 1. Red Banner */}
      <div className={styles.banner}>
        <span>DENTAL EMERGENCY? WE'RE HERE TO HELP</span>
        <a href={`tel:${phoneNumber}`} className={styles.bannerButton}>Call Now</a>
      </div>

      {/* 2. Main Header */}
      <header className={styles.header}>
        <div className={styles.logo}>Dr. Priya Sharma</div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ''}`}>
          <ul>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>HOME</Link></li>
            <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>ABOUT</Link></li>
            <li><Link href="/servicesNav" onClick={() => setIsMenuOpen(false)}>SERVICES</Link></li>
            <li><Link href="/blogpage" onClick={() => setIsMenuOpen(false)}>BLOGS</Link></li>
          </ul>
        </nav>

        {/* Contact Us Button - Modal trigger */}
        <button className={styles.bookButton} onClick={() => setIsFormOpen(true)}>
          Contact us
        </button>

        <button className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`${styles.bar} ${isMenuOpen ? styles.bar1 : ''}`}></div>
          <div className={`${styles.bar} ${isMenuOpen ? styles.bar2 : ''}`}></div>
          <div className={`${styles.bar} ${isMenuOpen ? styles.bar3 : ''}`}></div>
        </button>
      </header>

      {/* 3. Popup Contact Form Modal */}
      {isFormOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsFormOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsFormOpen(false)}>&times;</button>
            
            <h3>Enquire Now</h3>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter phone number" required />
              </div>

              <div className={styles.formGroup}>
                <label>Interested In</label>
                <select required>
                  <option value="">Select an option</option>
                  <option value="checkup">Dental Checkup</option>
                  <option value="cosmetic">Cosmetic Dentistry</option>
                  <option value="emergency">Emergency Care</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Your Message</label>
                <textarea rows="4" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>Send Message</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;