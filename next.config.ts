import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // ระบุ port ของ API Server ของเรา
        pathname: '/uploads/**', // อนุญาตทุก path ที่อยู่ภายใต้ /uploads/
      },
    ],
  },
};

export default nextConfig;
