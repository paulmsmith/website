const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const htmlMinTransform = require('./transforms/html-min-transform.js');
const nunjucksEnv = require('./nunjucks.environment');
const config = require('../app.config');

module.exports = eleventyConfig => {
  // add transforms
  eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  // add plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  // make eleventy use my custom nunjucks 'environment'
  eleventyConfig.setLibrary('njk', nunjucksEnv);

  // set the layout aliases I use most often
  eleventyConfig.addLayoutAlias('master', 'layouts/master.njk');
  eleventyConfig.addLayoutAlias('blog', 'layouts/blog.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  return {
    dir: {
      // where are the files eleventy is to process
      input: `${config.paths.sourceDir}/www`,

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
