const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 基于模版自动在output.path目录中生成html
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 用于优化\最小化CSS资产
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 微型提取css插件
const safePostCssParser = require('postcss-safe-parser'); // 容错CSS解析器，它将发现并修复语法错误，能够解析任何输入.
const TerserPlugin = require('terser-webpack-plugin');
const { appIndexHtml, appFavicon } = require("../paths");

module.exports = (selfConfig) => {
  return merge(require('./webpack.common')(selfConfig), {
    mode: 'production', // 生产模式
    devtool: false,
    bail: true, // 开启bail。通常在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用HMR时，webpack会将在终端以及浏览器控制台中以红色文字记录这些错误，但仍然继续进行打包
    plugins: [
      new HtmlWebpackPlugin({
        favicon: appFavicon,
        template: appIndexHtml,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'css/style.[contentHash:8].css',
        chunkFilename: 'css/style.[contentHash:8].chunk.css',
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending futher investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
              drop_console: true,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: false,
        }), // 使用terser-webpack-plugin，需将devtool设为true
        // This is only used in production mode
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: false,
          },
        }),
      ],
      splitChunks: {
        chunks: 'all', // 选择全部模块进行优化
        minSize: 30000, // 生成块的最小大小（以字节为单位）
        maxSize: 0, // 告诉webpack尝试将大于maxSize的块拆分成较小的部分。零件的尺寸至少为minSize。
        minChunks: 1, // 拆分前必须共享模块的最小块数。
        maxAsyncRequests: 5, //按需加载时并行请求的最大数量
        maxInitialRequests: 3, // 入口点的最大并行请求数。
        automaticNameDelimiter: '~', // 默认情况下，webpack将使用块的来源和名称生成名称（例如vendors~main.js）。此选项使您可以指定用于生成名称的定界符。
        name: true, // 拆分块的名称。提供true将基于块和缓存组密钥自动生成一个名称。
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true, // 如果当前块包含已从主捆绑包中拆分出的模块，则将重用该模块，而不是生成新的模块。这可能会影响块的结果文件名。
          },
        },
      },
      runtimeChunk: true, //将optimization.runtimeChunk设置为true或"multiple"，会为每个单独包含runtime的入口起点添加一个额外的chunk。
    },
  });
};
