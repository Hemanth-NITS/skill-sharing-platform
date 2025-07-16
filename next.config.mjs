/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Adjust this value as needed, e.g., '5mb', '10mb', '20mb'
    },
  },
};

export default nextConfig;