import React from 'react';
// Components ko unke sahi path se import karein

import BlogSection from '../blogs/blogs'; // Agar aapka blog code 'blogpage' folder ke 'page.js' mein hai

export default function Home() {
  return (
    <main>
      

      {/* 3. Blog Section - Jo aapne Home ke andar create kiya hai */}
      <BlogSection />

    
    </main>
  );
}