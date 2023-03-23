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
  i18n: {
    locales: [
      // 'af',
      // 'am',
      // 'ar',
      // 'az',
      // 'bg',
      // 'bn',
      // 'bs',
      // 'ca',
      // 'cs',
      // 'cy',
      // 'da',
      // 'de',
      // 'el',
      'en',
      // 'es',
      // 'es-MX',
      // 'et',
      // 'fa',
      // 'fa-AF',
      // 'fi',
      // 'fr',
      // 'fr-CA',
      // 'ga',
      // 'gu',
      // 'ha',
      // 'he',
      // 'hi',
      // 'hr',
      // 'ht',
      // 'hu',
      // 'hy',
      // 'id',
      // 'is',
      // 'it',
      // 'ja',
      // 'ka',
      // 'kk',
      // 'kn',
      // 'ko',
      // 'lt',
      // 'lv',
      // 'mk',
      // 'ml',
      // 'mn',
      // 'mr',
      // 'ms',
      // 'mt',
      // 'nl',
      // 'no',
      // 'pa',
      // 'pl',
      // 'ps',
      // 'pt',
      // 'pt-PT',
      // 'ro',
      // 'ru',
      // 'si',
      // 'sk',
      // 'sl',
      // 'so',
      // 'sq',
      // 'sr',
      // 'sv',
      // 'sw',
      // 'ta',
      // 'te',
      // 'th',
      // 'tl',
      // 'tr',
      // 'uk',
      // 'ur',
      // 'uz',
      // 'vi',
      // 'zh',
      // 'zh-TW',
    ],
    defaultLocale: 'en',
  },
}

// module.exports.experiments.topLevelAwait = true
