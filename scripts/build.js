'use strict';

process.env.NODE_ENV = "production";

const customizedConfig = require("../utils/getConfig")();
const prodWebpack = require("../config/webpack.prod")(customizedConfig);
const webpack = require("webpack");
const compiler = webpack(prodWebpack);

compiler.run((err, stats) => {
  if(err){
     console.error(err);
  }
  console.log("build success!", stats.toString({
    colors: true,
    modules: false,
    children: false
  }))
});
