module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/images');

  eleventyConfig.addLayoutAlias('base', 'layouts/base.html');
  eleventyConfig.addLayoutAlias('home', 'layouts/home.html');
  eleventyConfig.addLayoutAlias('focus-areas', 'layouts/focus-areas.html');
  eleventyConfig.addLayoutAlias('about-us', 'layouts/about-us.html');
  eleventyConfig.addLayoutAlias('grants', 'layouts/grants-and-partnerships.html');
  eleventyConfig.addLayoutAlias('news', 'layouts/news.html');


  // Returns a collection of blog posts in reverse date order
  eleventyConfig.addCollection('featuredNews', collection => {
    return [...collection.getFilteredByGlob('./src/news/*.md')].reverse().splice(0, 2);
  });
  eleventyConfig.addCollection('news', collection => {
    return [...collection.getFilteredByGlob('./src/news/*.md')].reverse();
  });
  eleventyConfig.addCollection('focusAreas', collection => {
    return [...collection.getFilteredByGlob('./src/focusAreas/*.md')].reverse();
  });
  eleventyConfig.addCollection('board', collection => {
    return [...collection.getFilteredByGlob('./src/board/*.md')];
  });
  eleventyConfig.addCollection('staff', collection => {
    return [...collection.getFilteredByGlob('./src/staff/*.md')];
  });
  eleventyConfig.addCollection('grantees', collection => {
    return [...collection.getFilteredByGlob('./src/grantees/*.md')];
  });
  eleventyConfig.addCollection('partnerships', collection => {
    return [...collection.getFilteredByGlob('./src/partnerships/*.md')];
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
