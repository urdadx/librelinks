/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/spotify',
        destination: 'https://open.spotify.com/playlist/2dN9BfIi1ztGcOPOpwoZqG',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
