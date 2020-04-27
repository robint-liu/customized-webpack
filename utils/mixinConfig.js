// mixin webpack config
module.exports = (config, customizedConfig) => {
  if (typeof customizedConfig.webpack === "function") {
    return customizedConfig.webpack(config);
  }
  return config;
};
