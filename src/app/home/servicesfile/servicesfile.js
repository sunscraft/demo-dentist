"use client";

import React, { useEffect } from 'react';
import styles from './servicesfile.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const servicesData = [
  {
    title: 'Dental Checkup',
    description: 'Comprehensive screening including digital X-rays and deep scaling.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    ),
    iconBg: "#eef7ff",
    iconColor: "#007bff"
  },
  {
    title: 'Teeth Whitening',
    description: 'Advanced Zoom whitening for a smile up to 8 shades brighter.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
    ),
    iconBg: "#fffdf0",
    iconColor: "#d4af37"
  },
  {
    title: 'Dental Implants',
    description: 'Permanent, natural-looking tooth replacement solutions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
    ),
    iconBg: "#f0f4f8",
    iconColor: "#0d2137"
  },
  {
    title: 'Invisalign & Braces',
    description: 'Straighten your teeth discreetly with clear aligners.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
    ),
    iconBg: "#f5f3ff",
    iconColor: "#8b5cf6"
  },
  {
    title: 'Root Canal',
    description: 'Single-sitting, painless root canal procedures using rotary files.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
    ),
    iconBg: "#fff5f5",
    iconColor: "#ef4444"
  },
  {
    title: 'Pediatric Dentistry',
    description: 'Gentle dental care designed specifically for children.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
    ),
    iconBg: "#f0fff4",
    iconColor: "#22c55e"
  }
];

const ServicesFile = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header} data-aos="fade-up">
          <div>
            <h2 className={styles.mainTitle}>Complete Dental Solutions</h2>
            <p className={styles.subTitle}>
              From routine maintenance to complex reconstructive surgeries, we provide comprehensive care under one roof.
            </p>
          </div>
          <a href="#" className={styles.viewAll}>
            View All Services <span>→</span>
          </a>
        </div>

        <div className={styles.grid}>
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div 
                className={styles.iconContainer} 
                style={{ backgroundColor: service.iconBg }}
              >
                <div className={styles.icon} style={{ color: service.iconColor }}>
                  {service.icon}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesFile;