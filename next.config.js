const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  }
};

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
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 
    return config;
  },
}

module.exports = {
  // i18n: {
  //   locales: [
  //     'en',
  //   ],
  //   defaultLocale: 'en',
  // },
}

// module.exports.experiments.topLevelAwait = true
