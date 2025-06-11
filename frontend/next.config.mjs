/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,  // experimental options removed as serverActions is now enabled by default
  webpack: (config) => {
    // soroban ve stellar-sdk için gerekli webpack ayarları
    config.externals.push('better-sqlite3');
    return config;
  },
  // CORS politikası - Stellar testnet için gerekli
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
}

export default nextConfig;
