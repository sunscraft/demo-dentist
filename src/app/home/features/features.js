"use client"; 

import React, { useEffect } from 'react';
import styles from './features.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const featuresData = [
  {
    title: 'Painless Treatment',
    description: 'Experience dentistry without the fear. We use advanced local anesthesia and micro-needle technology to ensure a 100% comfortable and anxiety-free experience.',
    animation: 'fade-up',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 12c.5-6 5-6 5-6s4.5 0 5 6c.5 6-1 9-5 9s-5.5-3-5-9Z" />
        <path d="M12 6c.5 3 2.5 3 2.5 3" />
        <path d="M12 21v-4" />
      </svg>
    ),
    bgColor: "#e3f2fd"
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden costs or surprise bills. Get detailed treatment plans upfront with flexible EMI options and digital payment support for your peace of mind.',
    animation: 'fade-up',
    delay: 200,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <path d="M7 15h.01" />
        <path d="M11 15h2" />
      </svg>
    ),
    bgColor: "#fff9c4"
  },
  {
    title: 'Latest Technology',
    description: 'From 3D Intraoral scanners to Digital X-rays and Laser dentistry, we use cutting-edge diagnostic tools for higher precision and faster recovery times.',
    animation: 'fade-up',
    delay: 400,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
      </svg>
    ),
    bgColor: "#e8f5e9"
  },
];

const Features = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        
        {/* Full Content Header */}
        <div className={styles.sectionHeader} data-aos="fade-up">
          <span className={styles.tagline}>WHY CHOOSE OUR CLINIC</span>
          <h2 className={styles.mainHeading}>Experience Dentistry Redefined</h2>
          <p className={styles.descriptionText}>
            We combine world-class clinical expertise with a warm, patient-first approach. 
            Discover why thousands of families trust us for their oral healthcare needs.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className={styles.featureCard}
              data-aos={feature.animation}
              data-aos-delay={feature.delay || 0}
            >
              <div 
                className={styles.iconWrapper} 
                style={{ backgroundColor: feature.bgColor }}
              >
                <div className={styles.svgIcon}>
                  {feature.icon}
                </div>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;