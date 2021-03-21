const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const util = require('util');
const markdownIt = require('markdown-it')({
  html: true,
  linkify: false,
  typographer: true
});
const pluginCloudinaryImage = require('eleventy-plugin-cloudinary');
const htmlMinTransform = require('./transforms/html-min-transform.js');
const nunjucksEnv = require('./nunjucks.environment');
const config = require('../app.config');

/* eslint no-param-reassign: ["error", { "props": false }] */
module.exports = eleventyConfig => {
  // add transforms
  if (config.currentEnv !== 'dev') {
    // if currently in dev then don't minify the HTML output
    eleventyConfig.addTransform('htmlmin', htmlMinTransform);
  }

  // cloudinary config
  eleventyConfig.cloudinaryCloudName = 'paulmsmith';

  // add plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginCloudinaryImage);

  // make eleventy use my custom nunjucks 'environment'
  eleventyConfig.setLibrary('njk', nunjucksEnv);

  // set the layout aliases I use most often
  eleventyConfig.addLayoutAlias('master', 'master.njk');
  eleventyConfig.addLayoutAlias('blog', 'blog.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');

  eleventyConfig.addFilter('debug', function debug(value) {
    return util.inspect(value, { compact: false });
  });

  eleventyConfig.addShortcode(
    'newcloudinaryImage',
    (path, transforms, alt, width, height, CSSClass) =>
      `<img src="https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/fetch/${transforms}/${path}" alt="${alt}" loading="lazy" width="${width}" height="${height}" class="${CSSClass}">`
  );

  eleventyConfig.addPairedShortcode('markdown', (content, inline = null) => {
    return inline
      ? markdownIt.renderInline(content)
      : markdownIt.render(content);
  });

  eleventyConfig.addCollection('post', collection => {
    return [...collection.getFilteredByGlob('./src/www/posts/*.md')].reverse();
  });

  return {
    dir: {
      // where are the files eleventy is to process
      input: `${config.paths.sourceDir}/www`,

      // where should eleventy put the rendered pages
      output: `${config.paths.distDir}`,

      // where within the input path are the includes?
      // (macros, partials/includes, layouts)
      includes: `_templates`,
      layouts: `_templates/layouts`
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
