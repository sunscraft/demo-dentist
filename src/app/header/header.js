import React from 'react';
import Link from 'next/link';
import styles from './header.module.css';

const Header = () => {
  const phoneNumber = "+917024934163"; // Aapka number yahan aayega

  return (
    <div className={styles.headerContainer}>
      {/* 1. Red Dental Emergency Banner */}
      <div className={styles.banner}>
        <span>DENTAL EMERGENCY? WE'RE HERE TO HELP</span>
        {/* Direct Call Link */}
        <a href={`tel:${phoneNumber}`} className={styles.bannerButton}>
          Call Now
        </a>
      </div>

      {/* 2. Main Header / Navigation */}
      <header className={styles.header}>
        <div className={styles.logo}>Dr. Priya Sharma</div>
        <nav className={styles.nav}>
          <ul>
            <li><Link href="/">HOME</Link></li>
            <li><Link href="/about">ABOUT</Link></li>
            <li><Link href="/servicesNav">SERVICES</Link></li>
            <li><Link href="/blogpage">BLOGS</Link></li>
          </ul>
        </nav>
        <button className={styles.bookButton}>Book Appointment</button>
      </header>
    </div>
  );
};

export default Header;