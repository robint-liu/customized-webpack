"use strict";

process.env.NODE_ENV = "production";

const customizedConfig = require("../utils/getConfig")();
const prodWebpack = require("../config/webpack.prod")(customizedConfig);
const Webpack = require("webpack");
const compiler = Webpack(prodWebpack);

// compiler 的 run 调用，并传入 callback
compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  }
  console.log(
    "build success!",
    stats.toString({
      colors: true,
      modules: false,
      children: false,
    })
  );
});
