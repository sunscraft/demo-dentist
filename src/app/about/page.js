// src/app/about/page.js

import About from './about'; // 'About' ki jagah './about' karein (small 'a')
 // Footer component import
export const metadata = {
  title: 'About Us | Dr. Priya Sharma',
  description: 'Learn more about Dr. Priya Sharma and her dental excellence in Noida.',
};

export default function Page() {
  return (
    <main>
      {/* Aapka naya Dental Clinic Hero Section */}

      <About />
      
      {/* Future sections like About, Services, etc. yahan aayenge */}
    </main>
  );
 
}