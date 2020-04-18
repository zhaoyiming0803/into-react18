const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
// const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, "../", dir);
}

module.exports = {
  entry: resolve("index.tsx"),
  output: {
    filename: "[name].[hash].js",
    path: resolve("dist/"),
    publicPath:
      process.env.NODE_ENV === "prod"
        ? "/pure-react-project-with-webpack/"
        : "/",
  },
  resolve: {
    alias: {
      "@": resolve("src"),
      static: resolve("static"),
    },
    extensions: [".js", ".jsx", ".css", ".less", ".ts", ".tsx", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      env: process.env.NODE_ENV,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      },
      inlineSource: ".(main).*.(js)",
    }),
    new HtmlWebpackInlineSourcePlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "main.css",
    // }),
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: "defer",
    // }),
  ],
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.less$/,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[hash:base64:8]",
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.(jpg|jpeg|png|gif|svg)$/,
        use: ["url-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: "antd-mobile",
                    libraryDirectory: "es",
                    style: "css",
                  }),
                ],
              }),
            },
          },
          "tslint-loader",
        ],
      },
    ],
  },
};
