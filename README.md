# customized-webpack

customized-webpack是专为SPA服务的构建工具，可支持react、typeScript，个性化拓展webpack。

## template-directory
 your project

```
    assets
        images
            favicon.png
    src
        index.js
    index.html
    package.json
    tsconfig.json (if you need)
    webpack.js (自定义配置，现支持如下：)
        proxy: {}, // api代理
        autoOpenUrl: "http://localhost", // devServer hostname，需设置autoOpenUrl ==> 127.0.0.1
        port: 3000, // devServer port
        useTs: false, // 是否启用ts
        useEslint: false, // 是否启用eslint
        useBundleAnalyzer: true, // 是否启用打包分析
        webpack(config) { // 支持自定义webpack
           return config;
        },
