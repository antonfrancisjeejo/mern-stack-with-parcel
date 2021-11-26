module.exports = {
  plugins: [
    require("posthtml-include")({ root: "frontend/src" }),
    require("posthtml-expressions")({}),
  ],
};
