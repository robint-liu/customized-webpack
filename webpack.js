// 自定义设置webpack（暂支持这些）
module.exports = {
  proxy: {}, // api代理
  autoOpenUrl: "http://localhost", // devServer hostname，需设置autoOpenUrl ==> 127.0.0.1
  port: 3000, // devServer port
  useTs: false, // 是否启用ts
  useEslint: false, // 是否启用eslint
  useBundleAnalyzer: true, // 是否启用打包分析
  webpack(config) { // 支持自定义webpack
    return config;
  },
};
