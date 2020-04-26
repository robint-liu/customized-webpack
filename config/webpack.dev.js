const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 基于模版自动在output.path目录中生成html
const { appIndexHtml, appFavicon } = require("../paths");

module.exports = (selfConfig) => {
  return merge(require("./webpack.common")(selfConfig), {
    mode: "development", // 开发模式
    devtool: "cheap-module-eval-source-map", //低开销的source map，没有生成列映射，只是生成了行数。更好的处理源自loader的source map。
    plugins: [
      new webpack.NamedChunksPlugin(), // 热更新时直接返回更新文件名称及路径
      new webpack.HotModuleReplacementPlugin(), // webpack的热更新插件
      new HtmlWebpackPlugin({
        inject: true, // 将所有资源注入给定template形成的html，传递时，true或'body'所有javascript资源都将放置在body元素的底部。'head'会将脚本放置在head元素中。
        template: appIndexHtml,
        favicon: appFavicon,
      }),
    ],
  });
};
