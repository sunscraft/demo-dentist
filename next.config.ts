/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com', // Pixabay videos cdn.pixabay.com se aate hain
      },
    ],
  },
};

export default nextConfig;