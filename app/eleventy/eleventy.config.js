const config = require('../app.config');

module.exports = eleventyConfig => {
  return {
    dir: {
      input: `${config.paths.sourceDir}/site`,
      output: `${config.paths.distDir}`,
      includes: `_templates`
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
