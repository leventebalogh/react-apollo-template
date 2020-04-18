const path = require("path");

/* eslint-disable global-require */
module.exports = {
  plugins: [
    require("tailwindcss")(path.normalize(`${__dirname}/tailwind.config.js`)),
    require("postcss-import"),

    // IMPORTANT!!!
    // Currently we cannot turn on purge-css as unfortunately a lot of necessary classnames
    // are used inside the @devcrush/... packages.
    // A solution for this would be to build those packages with their CSS files and import those
    // then merge and purge them here.
    //
    // process.env.NODE_ENV === "production" &&
    //   require("@fullhuman/postcss-purgecss")({
    //     content: ["./src/**/*.js", "./src/index.html"],
    //     css: ["./src/**/*.scss", "./src/**/*.css"],
    //     defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    //   })
  ],
};
