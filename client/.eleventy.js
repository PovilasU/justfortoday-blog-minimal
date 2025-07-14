module.exports = function(eleventyConfig) {
  // Copy CSS directly to _site
  eleventyConfig.addPassthroughCopy("src/css");
   eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  return {
    dir: {
      input: "src",
      includes: "includes",
      output: "_site",
    }
  };
};
