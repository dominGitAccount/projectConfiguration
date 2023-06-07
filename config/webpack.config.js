// nodejs中的核心模块，用来处理路径
const path = require("path");
// eslint 检查js文件规范
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
// 处理HTML文件，以public中的HTML文件为模板，自动引入打包后的主文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// react 框架中实现热更新 激活js的HMR功能
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// 提取css成单独的文件，替换style-loader为MiniCssExtractPlugin；并在plugins中能new一下
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 压缩JS
const TerserWebpackPlugin = require("terser-webpack-plugin");
// 压缩图片
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// 复制插件 从哪里复制到哪里   可以解决public中的title图标打包之后没有复制到dist的问题
const CopyPlugin = require("copy-webpack-plugin");
// 需要通过 cross-env 定义环境变量         获取进程上的环境变量
const isProduction = process.env.NODE_ENV === "production";

// 将用到的样式loader代码复用
const getStyleLoaders = (preProcessor) => {
  return [
    // 生产模式下需要将css打包成单独文件
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    {
      loader: "postcss-loader", //为了解决各个浏览器版本兼容性问题等
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题，提供的浏览器的预置环境

            {
              browsers: 'last 2 versions', //配置兼容的浏览器版本，最新两个版本的浏览器
            }

          ],
        },
      },
    },
    preProcessor && {
      loader: preProcessor,
      options:
        // 如果是less-loader，修改antd的主题色
        preProcessor === "less-loader"
          ? {
            // antd的自定义主题
            lessOptions: {
              modifyVars: {
                // 其他主题色：https://ant.design/docs/react/customize-theme-cn
                "@primary-color": "#1DA57A", // 全局主色
              },
              javascriptEnabled: true,
            },
          }
          : {},
    },
  ].filter(Boolean);
};

module.exports = {
  // 入口
  entry: "./src/main.js",
  // 出口
  output: {
    // 生产模式下输出到dist目录下，开发模式没有输出
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
    /**
     * 一旦将来发布新版本，因为文件名没有变化导致浏览器会直接读取缓存，不会加载新资源，项目也就没法更新了。
     * 利用：contenthash--确保更新前后文件名不一样，这样就可以做缓存了。
     * 根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的
     */
    // 输出的文件名  name会已打包的chunk名自动补全 ~ 入口文件的打包目录
    filename: isProduction
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js",
    // 打包多余的chunk ~ import动态引入的，或者nodeModules中的
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js",
    // 图片，字体等资源
    assetModuleFilename: "static/js/[hash:10][ext][query]",
    // 打包之前清空之前所有的打包文件
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          /*=========  处理样式资源  =============*/
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
          },
          /*=========  处理图片等资源  =============*/
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
          },
          /*=========  处理其他资源（字体图标，mp3,mp4等）  =============*/
          // asset/resource配置不会转换成base64，原封不动的输出
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
          },
          /*=========  处理js资源（eslint对代码进行检查；babel对代码进行转换）  =============*/
          {
            test: /\.(jsx|js)$/,
            // 需要处理的资源文件目录
            include: path.resolve(__dirname, "../src"),
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel编译缓存 -让第二次打包时候更快
              cacheCompression: false, // 缓存文件不要压缩，缓存速度更快
              plugins: [
                // "@babel/plugin-transform-runtime",  // presets中包含了
                /*=== 激活js的HMR功能 ==*/
                !isProduction && "react-refresh/babel",
              ].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    /*=========  Eslint-检查js文件规范  =============*/
    new ESLintWebpackPlugin({
      extensions: [".js", ".jsx"],
      // 处理文件的范围 应用绝对路径 path会返回绝对路径
      context: path.resolve(__dirname, "../src"),
      // 排除node-modules文件
      exclude: "node_modules",
      // 缓存
      cache: true,
      // 配置缓存的目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    /*=========  处理HTML文件  =============*/
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    /*=========  处理CSS文件，打包成单独文件  =============*/
    isProduction &&
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
    /*=========  解决热更新问题  =============*/
    !isProduction && new ReactRefreshWebpackPlugin(),
    /*=========  复制-插件  =============*/
    // 将public下面的资源复制到dist目录去（除了index.html）
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: "dir",
          noErrorOnMissing: true, // 不生成错误
          globOptions: {
            // 忽略文件
            ignore: ["**/index.html"],
          },
          info: {
            // 跳过terser压缩js
            minimized: true,
          },
        },
      ],
    }),
  ].filter(Boolean),
  /*=========  处理打包chunk文件，分割代码，使打包文件不要放到一个文件中  =============*/
  optimization: {
    // 控制是否需要进行压缩 true需要压缩  生产环境需要压缩
    minimize: isProduction,
    // 压缩的操作
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserWebpackPlugin(),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置 主要： node_modules 及import动态导入的进行单独打包
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // layouts通常是admin项目的主体布局组件，所有路由组件都要使用的
        // 可以单独打包，从而复用
        // 如果项目中没有，请删除
        layouts: {
          name: "layouts",
          test: path.resolve(__dirname, "../src/layouts"),
          priority: 40,
        },
        // 如果项目中使用antd，此时将所有node_modules打包在一起，那么打包输出文件会比较大。
        // 所以我们将node_modules中比较大的模块单独打包，从而并行加载速度更好
        // 如果项目中没有，请删除
        antd: {
          name: "chunk-antd",
          test: /[\\/]node_modules[\\/]antd(.*)/,
          priority: 30,
        },
        // 将react相关的库单独打包，减少node_modules的chunk体积。
        react: {
          name: "react",
          // 检测什么文件  react  react-dom react-router-dom 等
          // [\\/]  \ /两种符号都可以
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          chunks: "initial",
          // 打包权重
          priority: 20,
        },
        // 剩下的 如node——modules打包到libs中
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10, // 权重最低，优先考虑前面内容
          chunks: "initial",
        },
      },
      // 其他都用默认值
    },
    // 代码分割会导致缓存失效，需要配置runtime进行关联映射
    runtimeChunk: {
      // 命名runtime文件
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  /*=========  webpack解析模块时加载的选项  =============*/
  resolve: {
    // 从.jsx 到.json顺序，如果三个类型都没有就会报错
    extensions: [".jsx", ".js", ".json"], // 自动补全文件扩展名，让jsx可以使用
  },
  /*=========  自动化配置：运行指令时需要加serve 激活devServer配置开发模式  =============*/
  devServer: {
    open: true, //自动打开浏览器
    host: "localhost", //域名
    port: 8000, //端口号
    hot: true, //HMR 开启热模替换(样式HMR，style-loader配合处理)
    compress: true,
    historyApiFallback: true, //******解决react-router刷新404问题 *****/ 
  },
  /*=========  开发模式配置（代码运行时读取的环境变量）  =============*/
  mode: isProduction ? "production" : "development",
  /*=========  为了开发调试更友好，精确  =============*/
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  performance: false, // 关闭性能分析，提升打包速度吧
};