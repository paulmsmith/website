module.exports = eleventyConfig => {
  return {
    dir: {
      input: './src/site',
      output: './build',
      includes: '_templates'
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
