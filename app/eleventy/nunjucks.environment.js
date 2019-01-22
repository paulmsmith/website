const Nunjucks = require('nunjucks');
const WithExtension = require('@allmarkedup/nunjucks-with');
const NunjucksFilters = require('./nunjucks.filters');
const config = require('../app.config');

// instantiate the nunjucks environment
const nunjucksEnvironment = new Nunjucks.Environment(
  new Nunjucks.FileSystemLoader(['./src/site/_templates'])
);

/**
 * import some legacy nunjucks filters from previous work (for now)
 * TODO: separate out into individual files and convert to 11ty
 * 'universal' filters.
 */
const customFilters = NunjucksFilters(nunjucksEnvironment, {
  isDev: config.isDev,
  isNotLocal: config.isNotLocal,
  isProd: config.isProd,
  assetsURL: config.assetsURL
});

/** loop over the filters and add them to the nunjucks env */
Object.keys(customFilters).forEach(filterName => {
  nunjucksEnvironment.addFilter(filterName, customFilters[filterName]);
});

/** useful to know in the templates if we are running on local server */
nunjucksEnvironment.addGlobal('isNotLocal', config.isNotLocal);

/**
 * the magic source to allow me to set bespoke context for include files
 * so that I can reuse them as a macro as well. Thanks Mark!!
 */
nunjucksEnvironment.addExtension('WithExtension', new WithExtension());

module.exports = nunjucksEnvironment;
