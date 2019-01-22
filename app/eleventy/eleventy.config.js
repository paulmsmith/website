const nunjucksEnv = require('./nunjucks.environment');
const config = require('../app.config');

module.exports = eleventyConfig => {
  /** make eleventy use my customer nunjucks 'environment' */
  eleventyConfig.setLibrary('njk', nunjucksEnv);
  return {
    dir: {
      // where are the files eleventy is to process
      input: `${config.paths.sourceDir}/site`,

      // where should eleventy put the rendered pages
      output: `${config.paths.distDir}`,

      // where within the input path are the includes?
      // (macros, partials/includes, layouts)
      includes: `_templates`
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
