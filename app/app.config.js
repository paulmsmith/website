const sourceDir = `./src`;
const assetsDir = `${sourceDir}/assets`;
const templatesDir = `${sourceDir}/www`;
const distDir = `./build`;
const assetsDistDir = `${distDir}/assets`;
const env = process.env.NODE_ENV;

const config = {
  envs: {
    development: {
      name: 'dev',
      assetsURL: ''
    },
    production: {
      name: 'production',
      assetsURL: ''
    }
  },
  prefixBrowsers: [
    'ie >= 8',
    'ie_mob >= 10',
    'ff >= 20',
    'chrome >= 4',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ],
  paths: {
    sourceDir,
    distDir,
    eleventyConfigPath: `./app/eleventy/eleventy.config.js`,
    fonts: {
      src: [`${assetsDir}/fonts`],
      dest: `${assetsDistDir}`
    },
    images: {
      src: [`${assetsDir}/images`],
      dest: `${assetsDistDir}`
    },
    scripts: {
      src: [`${assetsDir}/scripts`, `${templatesDir}/_templates/components`],
      dest: `${assetsDistDir}/scripts/`,
      outputFile: `scripts.js`
    },
    stylesheets: {
      src: [`${assetsDir}/styles`, `${templatesDir}/_templates/components`],
      dest: `${assetsDistDir}/styles/`
    },
    templates: {
      src: [templatesDir],
      dest: `${distDir}/`
    }
  }
};

// establish the environemnt and add hooks
const isProd = env === config.envs.production.name;
const isDev = env === config.envs.development.name;

/**
 * IIFE returns the correct URL for assets dependant on
 * the environment variables declaring what environment
 * this code is running on.
 */
const assetsURL = (function assetsURL() {
  if (isProd) {
    return config.envs.production.assetsURL;
  }
  if (isDev) {
    return config.envs.production.assetsURL;
  }
  return '';
})();

/**
 * IIFE that sets value to be the environment the
 * app is running in
 */
const currentEnv = (function currentEnv() {
  if (isDev) {
    return config.envs.development.name;
  }
  if (isProd) {
    return config.envs.production.name;
  }
  return 'local';
})();

/**
 * Create a final object with the dynamic properties
 * added in and available to the other gulp files.
 */
module.exports = Object.assign(config, {
  isProd,
  isDev,
  assetsURL,
  currentEnv
});
