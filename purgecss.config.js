module.exports = {
  content: [
    "./frontend/src/**/*.html",
    "./frontend/src/**/*.svg",
    "./frontend/src/**/*.js",
  ],
  extractors: [
    {
      extensions: ["html", "svg", "js"],
      extractor: class TailwindExtractor {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:/]+/g) || [];
        }
      },
    },
  ],
};
