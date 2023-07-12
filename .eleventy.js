
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {




  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/admin');


  eleventyConfig.addLayoutAlias('base', 'layouts/base.html');
  eleventyConfig.addLayoutAlias('home', 'layouts/home.html');
  eleventyConfig.addLayoutAlias('focus-areas', 'layouts/focus-areas.html');
  eleventyConfig.addLayoutAlias('about-us', 'layouts/about-us.html');
  eleventyConfig.addLayoutAlias('our-work', 'layouts/our-work.html');
  eleventyConfig.addLayoutAlias('grants', 'layouts/grants-and-partnerships.html');
  eleventyConfig.addLayoutAlias('news', 'layouts/news.html');
  eleventyConfig.addLayoutAlias('privacy', 'layouts/privacy.html');
  eleventyConfig.addLayoutAlias('imprint', 'layouts/imprint.html');

  eleventyConfig.addPlugin(EleventyRenderPlugin);


  // Returns a collection of blog posts in reverse date order
  eleventyConfig.addCollection('staff', collection => {
    return [...collection.getFilteredByGlob('./src/staff/*.md')];
  });
  eleventyConfig.addCollection('grantees', collection => {
    return [...collection.getFilteredByGlob('./src/grantees/*.md')];
  });
  eleventyConfig.addCollection('partnerships', collection => {
    return [...collection.getFilteredByGlob('./src/partnerships/*.md')];
  });

  eleventyConfig.addCollection('board', collection => {
    return collection
      .getFilteredByGlob('./src/board/*.md')
      .sort((a, b) => (Number(a.data.order) > Number(b.data.order) ? 1 : -1));
  });

  eleventyConfig.addCollection('focusAreas', collection => {
    return collection
      .getFilteredByGlob('./src/focus-areas/*.md')
      .sort((a, b) => (Number(a.data.order) > Number(b.data.order) ? 1 : -1));
  });

  eleventyConfig.addCollection('news', collection => {
    return [...collection.getFilteredByGlob('./src/news/*.md')].sort(function (a, b) {
      //return a.date - b.date; // sort by date - ascending
      return b.date - a.date; // sort by date - descending
      //return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
      //return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
    });
  });

  eleventyConfig.addCollection('featuredNews', collection => {
    return [...collection.getFilteredByGlob('./src/news/*.md')].sort(function (a, b) { return b.date - a.date; }).slice(0, 2);
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public'
    }
  };
};

