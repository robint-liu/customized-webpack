"use strict";

process.env.NODE_ENV = "development";

const {appBuild} = require("../paths");
const customizedConfig = require("../utils/getConfig")();
const WebpackDevServer = require("webpack-dev-server");
const devWebpack = require("../config/webpack.dev")(customizedConfig);
const Webpack = require("webpack");
const compiler = Webpack(devWebpack);

const devOptions = {
  contentBase: appBuild, // 告诉服务器从何处提供内容，未起作用
  hot: true, // 模块热更新
  noInfo: true,
  inline: true, // 在开发服务器的两种不同模式之间切换，默认情况下，将为应用程序内启用内联模式，为false时采用iframe模式。
  overlay: true,
  compress: true, // 启用压缩
  disableHostCheck: true, //绕过主机检查
  proxy: customizedConfig.proxy || {}, // api代理
  clientLogLevel: "none", // 当使用内联模式(inline mode)时，会在开发工具(DevTools)的控制台(console)显示消息，"none"为关闭状态
  host: "0.0.0.0", // 同一局域网下可以访问页面
  stats: {
    // 统计信息
    colors: true,
  },
};

const server = new WebpackDevServer(compiler, devOptions);
server.listen(customizedConfig.port, "0.0.0.0", () => {
  console.log(
    "Starting server on " +
    customizedConfig.autoOpenUrl +
    ":" +
    customizedConfig.port
  );
});
