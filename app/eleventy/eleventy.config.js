/* eslint-disable import/extensions */
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const util = require('util');
const { stringify } = require('javascript-stringify');
const markdownIt = require('markdown-it')({
  html: true,
  linkify: false,
  typographer: true
});
const markdownItAnchor = require('markdown-it-anchor');
const markdownItTOC = require('markdown-it-table-of-contents');
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
    return util.inspect(value, {
      compact: false
    });
  });

  eleventyConfig.addFilter('console', function console(value) {
    const output = stringify(value, null, '\t', { maxDepth: 3 });
    return `<script>console.log(${output});</script>`;
  });

  eleventyConfig.addShortcode('imgr', imageConfig => {
    // useful: https://cloudinary.com/blog/responsive_images_with_srcset_sizes_and_cloudinary
    const siteURL = `https://paulsmith.site`;
    const imagesPath = `assets/images/`;

    const configObj = {
      quality: '70',
      ...imageConfig
    };

    const imgAttributes = ` alt="${configObj.alt ? configObj.alt : ''}" ${
      configObj.lazyload ? ` lazyload="true"` : ``
    }${configObj.width ? ` width="${configObj.width}"` : ``}${
      configObj.height ? ` height="${configObj.height}"` : ``
    }${configObj.classes ? ` class="${configObj.classes}"` : ``}`;

    const cloudinaryURL = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/fetch`;

    if (config.currentEnv !== 'dev' || configObj.useCloud) {
      // prettier-ignore
      return `<img sizes="(min-width: 720px) 980px, 100vw"
      srcset="${cloudinaryURL}/f_auto,q_${configObj.quality},w_256${configObj.transforms ? `,${configObj.transforms}` : ''}/${siteURL}/${imagesPath}${configObj.imagePath} 256w,
              ${cloudinaryURL}/f_auto,q_${configObj.quality},w_512${configObj.transforms ? `,${configObj.transforms}` : ''}/${siteURL}/${imagesPath}${configObj.imagePath} 512w,
              ${cloudinaryURL}/f_auto,q_${configObj.quality},w_768${configObj.transforms ? `,${configObj.transforms}` : ''}/${siteURL}/${imagesPath}${configObj.imagePath} 768w,
              ${cloudinaryURL}/f_auto,q_${configObj.quality},w_1024${configObj.transforms ? `,${configObj.transforms}` : ''}/${siteURL}/${imagesPath}${configObj.imagePath} 1024w,
              ${cloudinaryURL}/f_auto,q_${configObj.quality},w_1280${configObj.transforms ? `,${configObj.transforms}` : ''}/${siteURL}/${imagesPath}${configObj.imagePath} 1280w"
      src="${cloudinaryURL}/f_auto,q_${configObj.quality},w_iw${configObj.transforms ? `,${configObj.transforms}` : ''}/${siteURL}/${imagesPath}${configObj.imagePath}"
      ${imgAttributes}>`;
    }
    return `<img src="/${imagesPath}${configObj.imagePath}"${imgAttributes}>`;
  });

  // adds {% markdown %}{% endmarkdown %} shortcode
  eleventyConfig.addPairedShortcode('markdown', (content, inline = null) => {
    markdownIt.use(markdownItAnchor);
    markdownIt.use(markdownItTOC, {
      containerClass: 'c-table-of-contents',
      containerHeaderHtml: `<div class="c-table-of-contents__header">Contents</div>`
    });

    return inline
      ? markdownIt.renderInline(content)
      : markdownIt.render(content);
  });

  eleventyConfig.addCollection('post', collection => {
    return [...collection.getFilteredByGlob('./src/www/posts/*.md')].reverse();
  });

  eleventyConfig.addCollection('weeknote', collection => {
    return [
      ...collection.getFilteredByGlob('./src/www/weeknotes/*.md')
    ].reverse();
  });

  // Filter source file names using a glob
  eleventyConfig.addCollection('writings', function addCollection(
    collectionApi
  ) {
    // Also accepts an array of globs!
    return collectionApi
      .getFilteredByGlob(['./src/www/weeknotes/*.md', './src/www/posts/*.md'])
      .reverse();
  });

  // Enable data deep merge
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy('./src/www/admin/**/*.!(njk)'); // exclude nunjucks templates

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
