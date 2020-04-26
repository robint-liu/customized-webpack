module.exports = {
  plugins: [
    require('autoprefixer'), //解析css，并用"can i use"里的兼容规则添加供应商前缀
    require('postcss-nested'), // 展开嵌套css
    require('postcss-flexbugs-fixes'), // 解决所有flexbug的问题
    require('postcss-preset-env')({ // 预置运营环境，即将现代css转换为大多数浏览器都理解的内容，并根据目标浏览器或运行时环境确定所需的polyfill
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    })
  ]
}
