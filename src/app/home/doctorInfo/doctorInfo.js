"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from './doctorInfo.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DoctorInfo = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const stats = [
    { text: "Gold Medalist University Topper" },
    { text: "Member of IDA & AAID" },
    { text: "Certified Laser Specialist" },
    { text: "Dental Implantology Expert" }
  ];

  return (
    <section className={styles.expertSection}>
      <div className={styles.container}>
        
        {/* Left Side: Image with Experience Badge */}
        <div className={styles.imageWrapper} data-aos="fade-right">
          <div className={styles.mainImageContainer}>
            <Image 
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop" 
              alt="Dr. Priya Sharma"
              width={500}
              height={600}
              className={styles.doctorImg}
            />
            {/* Floating Experience Badge */}
            <div className={styles.experienceBadge} data-aos="zoom-in" data-aos-delay="500">
              <span className={styles.expNumber}>15+</span>
              <span className={styles.expText}>Years of Clinical Excellence In Noida</span>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className={styles.contentWrapper} data-aos="fade-left">
          <span className={styles.subHeading}>MEET THE EXPERT</span>
          <h2 className={styles.title}>Dr. Priya Sharma</h2>
          <p className={styles.qualifications}>BDS, MDS (Oral & Maxillofacial Surgery)</p>
          
          <p className={styles.description}>
            Dr. Priya Sharma is recognized as a leader in aesthetic and surgical dentistry. 
            With a patient-first approach, she has transformed over 5,000 smiles 
            using the latest clinical protocols and a touch of artistic precision.
          </p>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <span className={styles.checkIcon}>✔</span>
                <span className={styles.statText}>{stat.text}</span>
              </div>
            ))}
          </div>

          <button className={styles.profileBtn}>
            Read Full Profile
            <span className={styles.btnArrow}>→</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default DoctorInfo;