const resolveApp = require("../utils/resolveApp.js");

module.exports = {
  appTsConfig: resolveApp("tsconfig.json"),
  appConfig: resolveApp("webpack.js"),
  appIndexJs: resolveApp("src/index"),
  appBuild: resolveApp("dist"),
  appFavicon: resolveApp("assets/images/favicon.png"),
  appIndexHtml: resolveApp("index.html"),
};
