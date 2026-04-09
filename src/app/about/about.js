import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './about.module.css'; // CSS Module Import
import { FaWhatsapp } from 'react-icons/fa';

const AboutPage = () => {
  const whatsappUrl = "https://wa.me/917024934163";
  return (
    <div className={styles.aboutPage}>
      
     

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <Image 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
            alt="Clinic" 
            fill 
            className="object-cover" 
          />
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1>About Dr. Priya Sharma</h1>
            <p>Noida's Premier Destination for Dental Excellence</p>
          </div>
        </section>

        {/* Profile Section */}
        <section className={styles.profileSection}>
          <div className={styles.imageWrapper}>
            <Image 
              src="/images/Gemini_Generated_Image_y2iobky2iobky2io.png" 
              alt="Dr. Priya" 
              width={500} 
              height={600} 
              className={styles.mainImg}
            />
            <div className={styles.experienceBadge}>
              <div className={styles.badgeNum}>15+</div>
              <div className={styles.badgeText}>Years Exp.</div>
            </div>
          </div>
          
          <div className={styles.infoContent}>
            <span className={styles.tag}>LEAD DENTIST & FOUNDER</span>
            <h2>Precision in Every Smile. Care in Every Touch.</h2>
            <p>
              Dr. Priya Sharma is a distinguished dental practitioner with over 15 years of dedicated experience. 
              She specializes in aesthetic dentistry and dental implants, bringing world-class technology to Noida.
            </p>
          </div>
        </section>

      
       {/* Team Section */}
<section className={styles.teamSection}>
  <div className={styles.teamHeader}>
    <h2>The Care Team</h2>
    <p>The passionate professionals behind your smile.</p>
  </div>

  <div className={styles.teamGrid}>
    {/* Member 1 */}
    <div className={styles.teamMember}>
      <div className={styles.memberImageWrapper}>
        <Image 
          src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974" 
          alt="Dr. Ananya Roy" 
          width={300} 
          height={400} 
          className={styles.memberImg}
        />
      </div>
      <h3 className={styles.memberName}>Dr. Ananya Roy</h3>
      <p className={styles.memberRole}>Associate Dentist</p>
    </div>

    {/* Member 2 */}
    <div className={styles.teamMember}>
      <div className={styles.memberImageWrapper}>
        <Image 
          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1928" 
          alt="Rohan Mehta" 
          width={300} 
          height={400} 
          className={styles.memberImg}
        />
      </div>
      <h3 className={styles.memberName}>Rohan Mehta</h3>
      <p className={styles.memberRole}>Senior Hygienist</p>
    </div>

    {/* Member 3 */}
    <div className={styles.teamMember}>
      <div className={styles.memberImageWrapper}>
        <Image 
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976" 
          alt="Saira Khan" 
          width={300} 
          height={400} 
          className={styles.memberImg}
        />
      </div>
      <h3 className={styles.memberName}>Saira Khan</h3>
      <p className={styles.memberRole}>Patient Coordinator</p>
    </div>

    {/* Member 4 */}
    <div className={styles.teamMember}>
      <div className={styles.memberImageWrapper}>
        <Image 
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070" 
          alt="Dr. Vikram Singh" 
          width={300} 
          height={400} 
          className={styles.memberImg}
        />
      </div>
      <h3 className={styles.memberName}>Dr. Vikram Singh</h3>
      <p className={styles.memberRole}>Endodontist</p>
    </div>
  </div>
</section>
      </main>

      {/* Floating WhatsApp */}
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

export default AboutPage;