/*
 * 获取自定义webpack配置：
 * 1、读取本地默认配置
 * 2、当项目配置存在时，读取项目自定义配置
 * */

const { appConfig } = require("../paths");
const selfConfig = require(appConfig);
const fs = require("fs-extra");
const localConfig = require("../webpack");

module.exports = () => {
  if (fs.pathExistsSync(appConfig)) {
    return require("lodash").defaultsDeep({}, localConfig, selfConfig);
  }
  return localConfig;
};
