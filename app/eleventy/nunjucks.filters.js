const { DateTime } = require('luxon');
const _ = require('lodash');
const stringify = require('javascript-stringify').stringify;

module.exports = function nunjucksFilters(nunj) {
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
   * @param  {Any} value any type
   * @return {String}   a script tag with a console.log call.
   * @example {{ "hello world" | console }}
   * @example {{ "hello world" | console | safe }}  [for environments with autoescaping turned on]
   */
  filters.console = function console(value) {
    const output = stringify(value, null, '\t', { maxDepth: 3 });
    return nunjucksSafe(`<script>console.log(${output});</script>`);
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
   * takes an item and returns it as a string
   * @param {*} item the item to be converted to a string
   */
  filters.makeString = function makeString(item) {
    return String(item);
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

  filters.dateToFormat = function dateToFormat(date, format) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(String(format));
  };

  filters.dateToISO = function dateToISO(date) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
      includeOffset: false,
      suppressMilliseconds: true
    });
  };

  filters.readableDate = function readableDate(
    dateObj,
    dateFormat = 'd LLL yyyy'
  ) {
    return DateTime.fromJSDate(dateObj == 'today' ? new Date() : dateObj, {
      zone: 'utc'
    }).toFormat(dateFormat);
  };

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  filters.htmlDateString = function htmlDateString(dateObj) {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
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
