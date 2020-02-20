const merge = require('webpack-merge');
const withOffline = require('next-offline');
const withTM = require('@weco/next-plugin-transpile-modules');

const {
  config: cfg,
  fontsLoader,
  imageLoader,
  cssLoader,
  mp3Loader
} = require('./webpack.config');

const nextOfflineConfig = {
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

module.exports = withOffline(
  withTM({
    webpack(config, { isServer }) {
      const { rules } = config.module;
      rules.push(imageLoader(isServer));
      rules.push(fontsLoader(isServer));
      rules.push(cssLoader(isServer));
      rules.push(mp3Loader(isServer));
      rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgProps: {
                fill: 'currentColor'
              }
            }
          }
        ]
      });

      return merge(config, cfg);
    },
    ...nextOfflineConfig
  })
);
