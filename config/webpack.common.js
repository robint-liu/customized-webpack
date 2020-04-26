const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除output.path
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 微型提取css插件
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin"); // 单独开辟进程进行类型检查
const { appTsConfig, appIndexJs, appBuild } = require("../paths");
const HappyPackPlugins = require("./happyPack");
const {tsLoader, cssLoader, postcssLoader, lessLoader} = require("./loaders");
const isDev = require("../utils/isDev.js");

module.exports = (customizedConfig) => {
  return {
    entry: {
      app: [
        require.resolve("./polyfills.js"),
        isDev() && "react-hot-loader/patch",
        appIndexJs,
      ].filter(Boolean),
    },
    output: {
      filename: "js/[name].[hash].js",
      chunkFilename: "js/[name].[contenthash:8].js", //非entry指定的模块的打包文件名称，同时拼接基于摘要内容生成的hash
      path: appBuild,
    },
    plugins: [
      new webpack.ProgressPlugin(), // 定制化编译进度
      new CleanWebpackPlugin(), // 清除output.path
      ...HappyPackPlugins,
      customizedConfig.useTs &&
        new ForkTsCheckerWebpackPlugin({
          tsconfig: appTsConfig,
          silent: true, // If true, logger will not be used
          async: isDev(), //false ==> can block webpack's emit to wait for type checker/linter and to add errors to the webpack's compilation.
          checkSyntacticErrors: true, //检查语法错误，否则只检查语义错误
          useTypescriptIncrementalApi: true,
          reportFiles: [
            '**',
            '!**/*.json',
            '!**/__tests__/**',
            '!**/?(*.)(spec|test).*',
            '!**/src/setupProxy.*',
            '!**/src/setupTests.*'
          ],
        }),
    ].filter(Boolean),
    module: {
      rules: [
        customizedConfig.useEslint && {
          test: /\.[t|j]sx?$/,
          loaders: "happypack/loader?id=eslint",
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          use: tsLoader,
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          loaders: "happypack/loader?id=js",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            isDev() ? "style-loader" : MiniCssExtractPlugin.loader,
            cssLoader,
            postcssLoader,
          ],
        },
        {
          test: /\.less$/,
          use: [
            isDev() ? "style-loader" : MiniCssExtractPlugin.loader,
            cssLoader,
            postcssLoader,
            lessLoader,
          ],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            isDev() ? "style-loader" : MiniCssExtractPlugin.loader,
            cssLoader,
            postcssLoader,
            "fast-sass-loader",
          ],
        },
        {
          test: /\.(jpe?g|png|git|svg)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192, // 最大为8192个字节，即8kb
              name: "images/[name].[hash:8].[ext]",
            },
          },
        },
        {
          test: /\.(woff2?|eot|[to]tf)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            },
          },
        },
      ].filter(Boolean),
    },
    performance: {
      // 配置如何展示性能提示
      hints: "warning", // 提示，当一个资源超过250kb，webpack会对此输出一个警告来提示你。
    },
  };
};
