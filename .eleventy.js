module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/images');

  eleventyConfig.addLayoutAlias('base', 'layouts/base.html');
  eleventyConfig.addLayoutAlias('home', 'layouts/home.html');

  // Returns a collection of blog posts in reverse date order
  eleventyConfig.addCollection('news', collection => {
    return [...collection.getFilteredByGlob('./src/news/*.md')].reverse().slice(0,2);
  });

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

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
