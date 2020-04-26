'use strict';

process.env.NODE_ENV = 'development';

const path = require('path');
const Webpack = require('webpack');
const customizedConfig = require('../utils/getConfig')();
const WebpackDevServer = require('webpack-dev-server');
const devWebpack = require('../config/webpack.dev')(customizedConfig);

// module.exports = devWebpack;

const compiler = Webpack(devWebpack);
const devOptions = {
  contentBase: path.join(__dirname, '../dist'), // 告诉服务器从何处提供内容，未起作用
  hot: true, // 模块热更新
  overlay: true,
  compress: true, // 启用压缩
  open: true, // 新开tab
  inline: true, // 在开发服务器的两种不同模式之间切换，默认情况下，将为应用程序内启用内联模式，为false时采用iframe模式。
  stats: {
    colors: true,
  },
};

const server = new WebpackDevServer(compiler, devOptions);
server.listen(customizedConfig.port || 8080, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8080');
});
