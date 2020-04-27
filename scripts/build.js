"use strict";

process.env.NODE_ENV = "production";

const Webpack = require("webpack");
const customizedConfig = require("../utils/getConfig")();
const prodWebpack = require("../config/webpack.prod")(customizedConfig);
const mixinConfig = require("../utils/mixinConfig");
const compiler = Webpack(mixinConfig(prodWebpack, customizedConfig));

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
