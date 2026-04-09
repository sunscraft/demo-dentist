import Hero from './home/hero/hero';
import Features from './home/features/features';
import DoctorInfo from './home/doctorInfo/doctorInfo';
import ServiceFile from './home/servicesfile/servicesfile';
import Reviews from './home/reviews/reviews';
import VideosFile from './home/videosfile/videosfile';
import Blogs from './blogs/blogs';

export default function Home() {
  return (
    <main>
      {/* Aapka naya Dental Clinic Hero Section */}
      <Hero />
      <Features/>
      <DoctorInfo/>
      <ServiceFile/>
      <Reviews/>
      <VideosFile/>
      <Blogs/>
      
      {/* Future sections like About, Services, etc. yahan aayenge */}
    </main>
  );
}