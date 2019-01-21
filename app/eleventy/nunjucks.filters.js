const _ = require('lodash');

module.exports = function nunjucksFilters(nunj, sys) {
  // if you need accss to the internal nunjucks filter you can just env
  // see the example below for 'safe' which is used in 'filters.log'
  const nunjucksSafe = nunj.getFilter('safe');

  /**
   * object used store the methods registered as a 'filter' (of the same name) within nunjucks
   * filters.foo("input") here, becomes {{ "input" | foo }} within nunjucks templates
   * @type {Object}
   */
  const filters = {};

  /**
   * logs an object in the template to the console on the client.
   * @param  {Any} a any type
   * @return {String}   a script tag with a console.log call.
   * @example {{ "hello world" | log }}
   * @example {{ "hello world" | log | safe }}  [for environments with autoescaping turned on]
   */
  filters.log = function log(a) {
    return nunjucksSafe(
      `<script>console.log(${JSON.stringify(a, null, '\t')});</script>`
    );
  };

  /* eslint-disable */
  /**
   * deep merge that supports concating arrays & strings.
   * @param  {Object} o1           a plain object to merge
   * @param  {Object} o2           a plain object to merge
   * @param  {Boolean} mergeStrings will merge strings together if true
   * @return {Object}              the resulting merged object
   */
  filters.deeperMerge = function deeperMerge(o1, o2, mergeStrings) {
    mergeStrings = typeof mergeStrings !== undefined ? mergeStrings : false;

    // exit conditions
    if (!o1 && !o2) {
      return;
    } else if (!_.isPlainObject(o1)) {
      return o2;
    } else if (!_.isPlainObject(o2)) {
      return o1;
    }

    return _.union(Object.keys(o1), Object.keys(o2))
      .map(function(k) {
        return [
          k,
          typeof o1[k] === 'string' && typeof o2[k] === 'string'
            ? mergeStrings
              ? o1[k] + o2[k]
              : o2[k]
            : _.isPlainObject(o1[k]) || _.isPlainObject(o2[k])
            ? deeperMerge(o1[k], o2[k], mergeStrings)
            : _.isArray(o1[k]) && _.isArray(o2[k])
            ? o1[k].concat(o2[k])
            : o1[k] && !o2[k]
            ? o1[k]
            : o2[k]
        ];
      })
      .reduce(function(a, b) {
        return (a[b[0]] = b[1]), a;
      }, {});
  };
  /* eslint-enable */

  /**
   * @param {String} s string to be hyphenated
   */
  filters.toHyphenated = function toHyphenated(s) {
    return s
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
  };

  /**
   * @param {String} path the path to assets
   */
  filters.asset = function asset(path) {
    if (sys.isDev) {
      return `${sys.pkg.config.assets.urls.dev}${path}`;
    }
    if (sys.isProd) {
      return `${sys.pkg.config.assets.urls.production}${path}`;
    }
    return `${path}`;
  };

  /**
   * prefixes the url of the ass
   * @param {String} string the string to prefix with the environment url
   */
  filters.prefixURL = function prefixURL(string, slash) {
    const addSlash = slash ? '/' : '';
    if (sys.isNotLocal) {
      return `${sys.assetsURL}${addSlash}${string}`;
    }
    return string;
  };

  /**
   * takes an item and returns it as a string
   * @param {*} item the item to be converted to a string
   */
  filters.makeString = function makeString(item) {
    return String(item);
  };

  /**
   * removes the file extension from a link if it is on dev handles
   * if it is a string or an object
   * @param {*} link the link object or string
   * @param {String} extension string for the extension to remove (defaults to .html)
   */

  filters.generateLink = (link, extension) => {
    // default extension to remove if not passed in
    const ext = extension || '.html';
    const linkTypeString = typeof link === 'string';
    // remove extension function
    const removeExtension = function removeExtension(s) {
      if (s.endsWith(ext)) {
        return s.substring(0, s.length - ext.length);
      }
      return s;
    };

    // making this a big readable if statement
    if (sys.isNotLocal) {
      if (linkTypeString) {
        return removeExtension(link);
      }
      return removeExtension(link.url);
    }
    if (linkTypeString) {
      return link;
    }
    return link.url;
  };

  /**
   * translate characters in a string
   * @param  {String} s  the string to translate
   * @param  {String} ss the substring to replace
   * @param  {String} r  the replacee string
   * @param  {String} f  regex flags, 'g' by default
   * @return {String}    a translated string
   */
  filters.trC = function trC(s, ss, r, f) {
    return (s || '').replace(
      new RegExp(ss, typeof f === 'string' ? f : 'g'),
      r
    );
  };

  // export some lodash methods directly.
  // See: https://lodash.com/docs
  filters.merge = _.merge;
  filters.defaults = _.defaults;
  filters.keys = _.keys;
  filters.values = _.values;
  filters.first = _.first;
  filters.flatten = _.flatten;
  filters.flattenDeep = _.flattenDeep;
  filters.get = _.get;
  filters.pick = _.pick;
  filters.range = _.range;
  filters.contains = _.contains;
  filters.zipObject = function zipObject(a) {
    return _.zipObject(a);
  };
  filters.omit = _.omit;
  filters.clone = _.clone;
  filters.kebabCase = _.kebabCase;
  filters.escapeHTML = _.escape;
  filters.unescapeHTML = _.unescape;

  return filters;
};
