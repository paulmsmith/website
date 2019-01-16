const sourceDir = `./src`;
const assetsDir = `${sourceDir}/assets`;
const distDir = `./build`;
const env = process.env.NODE_ENV;

const config = {
  envs: {
    development: {
      name: 'dev',
      assetsURL: ''
    },
    production: {
      name: 'prod',
      assetsURL: ''
    }
  },
  paths: {
    distDir,
    eleventyConfig: `./app/eleventy/eleventy.config.js`,
    fonts: {
      src: [`${assetsDir}/fonts`],
      dest: `${distDir}/fonts/`
    },
    images: {
      src: [`${assetsDir}/images`],
      dest: `${distDir}/images/`
    },
    scripts: {
      src: [`${assetsDir}/scripts`],
      dest: `${distDir}/scripts/`,
      outputFile: `scripts.js`
    },
    styles: {
      src: [`${assetsDir}/styles`],
      dest: `${distDir}/styles/`
    },
    templates: {
      src: [`${sourceDir}/templates`, `${sourceDir}/components`],
      dest: `${distDir}/`
    }
  }
};

// establish the environemnt and add hooks
const isProd = env === config.envs.production.name;
const isDev = env === config.envs.development.name;
const isNotLocal = isDev || isProd;

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

const currentEnv = (function currentEnv() {
  if (config.isNotLocal) {
    if (config.isDev) {
      return config.envs.development.name;
    }
    if (config.isProd) {
      return config.envs.production.name;
    }
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
  isNotLocal,
  assetsURL,
  currentEnv
});
