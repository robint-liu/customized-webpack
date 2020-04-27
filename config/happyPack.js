const HappyPack = require("happypack");
const threadPool = HappyPack.ThreadPool({size: 8});
const {eslintLoader, babelLoader} = require("./loaders");

// HappyPack通过并行转换文件使初始Webpack构建更快。
module.exports = [
  new HappyPack({
    id: "js",
    threadPool,
    loaders: [babelLoader],
  }),
  new HappyPack({
    id: "eslint",
    threadPool,
    loaders: [eslintLoader],
  }),
];
