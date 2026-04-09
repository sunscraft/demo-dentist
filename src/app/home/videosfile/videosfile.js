"use client";
import React, { useRef, useState, useEffect } from 'react';
import styles from './videosfile.module.css';

// Testing ke liye ye links 100% kaam karenge. 
// Pixabay links aksar "403 Forbidden" error dete hain direct embedding par.
const initialVideosData = [
  {
    id: 1,
    title: 'COSMETIC VENEERS',
    subtitle: 'Watch Transformation',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4', 
    type: 'video/mp4',
  },
  {
    id: 2,
    title: 'DENTAL IMPLANTS',
    subtitle: 'Patient Journey',
    videoSrc: 'https://www.w3schools.com/html/movie.mp4',
    type: 'video/mp4',
  },
  {
    id: 3,
    title: 'ROOT CANAL THERAPY',
    subtitle: 'Pain-Free Technology',
    videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    type: 'video/mp4',
  },
  {
    id: 4,
    title: 'TEETH WHITENING',
    subtitle: 'Brighter Smile',
    videoSrc: 'https://www.w3schools.com/html/movie.mp4',
    type: 'video/mp4',
  }
];

const VideoCard = ({ video, isActive }) => {
  const videoRef = useRef(null);

  // Play/Pause logic based on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(err => console.log("Playback error:", err));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  return (
    <div className={`${styles.videoCard} ${isActive ? styles.active : ''}`}>
      <div className={styles.videoWrapper}>
        <video 
          ref={videoRef}
          key={video.videoSrc} 
          src={video.videoSrc}
          loop
          muted 
          playsInline
          className={styles.videoPlayer}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay: Sirf tab dikhega jab mouse hover na ho */}
        {!isActive && (
          <div className={styles.videoOverlay}>
            <div className={styles.playIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M5 3L19 12L5 21V3Z" fill="white"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className={styles.videoInfo}>
        <h3 className={styles.videoTitle}>{video.title}</h3>
        <p className={styles.videoSubtitle}>{video.subtitle}</p>
      </div>
    </div>
  );
};

const VideosFile = () => {
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <section className={styles.videosSection}>
      <h2 className={styles.sectionTitle}>Video Smile Stories</h2>
      
      <div className={styles.scrollContainer}>
        {initialVideosData.map((video) => (
          <div
            key={video.id}
            className={styles.videoCardWrapper}
            onMouseEnter={() => setActiveVideoId(video.id)}
            onMouseLeave={() => setActiveVideoId(null)}
          >
            <VideoCard 
              video={video} 
              isActive={video.id === activeVideoId}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideosFile;