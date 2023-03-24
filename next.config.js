const withImages = require('next-images');

module.exports = withImages(redirects);

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ['res.cloudinary.com', 'ik.imagekit.io', 'img.icons8.com'],
      },
    ],
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
}

module.exports = {}