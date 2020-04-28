module.exports = {
  cssLoader: {
    loader: "css-loader",
    options: {
      // minimize: true,
      importLoaders: 2,
    },
  },
  postcssLoader: {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      config: {
        path: require.resolve("../postcss.config.js"),
      },
    },
  },
  lessLoader: {
    loader: "less-loader",
    options: {javascriptEnabled: true},
  },
  tsLoader: {
    loader: "ts-loader",
    options: {
      transpileOnly: true, //使用ForkTsCheckerWebpackPlugin进行类型检查
    },
  },
  babelLoader: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            targets: {
              browsers: ["last 2 versions"],
            },
          },
        ],
        "@babel/preset-react",
      ],
      plugins: [
        ["@babel/plugin-proposal-decorators", {legacy: true}],
        ["@babel/plugin-proposal-class-properties", {loose: true}],
        ["import", {libraryName: "antd"}, "antd"],
        "@babel/plugin-syntax-dynamic-import",
      ],
    },
  },
  eslintLoader: {
    loader: "eslint-loader",
    options: {
      cache: true,
      emitWarning: true,
      useEslintrc: false,
      ignore: false,
      root: true,
      parser: "babel-eslint",
      plugins: ["import", "react-hooks", "react", "lodash"],
      env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true,
      },
      parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
          generators: true,
          experimentalObjectRestSpread: true,
          legacyDecorators: true,
        },
      },
      rules: {
        // http://eslint.org/docs/rules/
        "array-callback-return": "warn",
        "default-case": 0,
        "dot-location": ["warn", "property"],
        "new-parens": "warn",
        "no-array-constructor": "warn",
        "no-caller": "warn",
        "no-cond-assign": ["warn", "always"],
        "no-const-assign": "warn",
        "no-control-regex": "warn",
        "no-delete-var": "warn",
        "no-dupe-args": "warn",
        "no-dupe-class-members": "warn",
        "no-dupe-keys": "warn",
        "no-duplicate-case": "warn",
        "no-empty-character-class": "warn",
        "no-empty-pattern": "warn",
        "no-eval": "warn",
        "no-ex-assign": "warn",
        "no-extend-native": "warn",
        "no-extra-bind": "warn",
        "no-extra-label": "warn",
        "no-fallthrough": "warn",
        "no-func-assign": "warn",
        "no-implied-eval": "warn",
        "no-invalid-regexp": "warn",
        "no-iterator": "warn",
        "no-label-var": "warn",
        "no-labels": ["warn", {allowLoop: true, allowSwitch: false}],
        "no-lone-blocks": "warn",
        "no-loop-func": "warn",
        "no-return-await": "error",
        "no-mixed-operators": [
          "warn",
          {
            groups: [
              ["&", "|", "^", "~", "<<", ">>", ">>>"],
              ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
              ["&&", "||"],
              ["in", "instanceof"],
            ],
            allowSamePrecedence: false,
          },
        ],
        "no-multi-str": "warn",
        "no-native-reassign": "warn",
        "no-negated-in-lhs": "warn",
        "no-new-func": "warn",
        "no-new-object": "warn",
        "no-new-symbol": "warn",
        "no-new-wrappers": "warn",
        "no-obj-calls": "warn",
        "no-octal": "warn",
        "no-octal-escape": "warn",
        "no-redeclare": "warn",
        "no-regex-spaces": "warn",
        "no-restricted-syntax": ["warn", "WithStatement"],
        "no-script-url": 0,
        "no-self-assign": "warn",
        "no-self-compare": "warn",
        "no-sequences": "warn",
        "no-shadow-restricted-names": "warn",
        "no-sparse-arrays": "warn",
        "no-template-curly-in-string": "warn",
        "no-this-before-super": "warn",
        "no-throw-literal": "warn",
        "no-undef": "error",
        "no-restricted-globals": ["error"],
        "no-unexpected-multiline": "warn",
        "no-unreachable": "warn",
        "no-unused-expressions": [
          "warn",
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        "no-unused-labels": "warn",
        "no-unused-vars": [
          "warn",
          {
            args: "none",
            ignoreRestSiblings: true,
          },
        ],
        "no-use-before-define": [
          "warn",
          {
            functions: false,
            classes: false,
            variables: false,
          },
        ],
        "no-useless-computed-key": "warn",
        "no-useless-concat": "warn",
        "no-useless-constructor": "warn",
        "no-useless-escape": "warn",
        "no-useless-rename": [
          "warn",
          {
            ignoreDestructuring: false,
            ignoreImport: false,
            ignoreExport: false,
          },
        ],
        "no-with": "warn",
        "no-whitespace-before-property": "warn",
        radix: 0,
        "require-yield": "warn",
        "rest-spread-spacing": ["warn", "never"],
        strict: ["warn", "never"],
        "unicode-bom": ["warn", "never"],
        "use-isnan": "warn",
        "valid-typeof": "warn",
        "no-restricted-properties": [
          "error",
          {
            object: "System",
            property: "import",
            message:
              "Please use import() instead. More info: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#code-splitting",
          },
        ],
        // 一个const，let 定义一个变量
        "one-var": ["warn", "never"],
        // 不使用 var
        "no-var": "warn",
        
        // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
        "import/first": "error",
        "import/no-amd": "error",
        "import/no-webpack-loader-syntax": "error",
        
        // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
        "react/jsx-no-comment-textnodes": "warn",
        "react/jsx-no-duplicate-props": ["warn", {ignoreCase: true}],
        "react/jsx-no-target-blank": "warn",
        "react/jsx-no-undef": "error",
        "react/jsx-pascal-case": [
          "warn",
          {
            allowAllCaps: true,
            ignore: [],
          },
        ],
        "react/jsx-uses-react": "warn",
        "react/jsx-uses-vars": "warn",
        "react/no-danger-with-children": "warn",
        "react/no-deprecated": "warn",
        "react/no-direct-mutation-state": "warn",
        "react/no-is-mounted": "warn",
        "react/react-in-jsx-scope": "error",
        "react/require-render-return": "error",
        "react/style-prop-object": "warn",
        // disallow ref="string"
        "react/no-string-refs": "warn",
        // force import isEqual from 'lodash/isEqual'
        "lodash/import-scope": ["error", "method"],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
      },
    },
  },
};
