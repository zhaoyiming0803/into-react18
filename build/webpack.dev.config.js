const baseWebpackConfig = require("./webpack.base.config");
const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const fs = require("fs");

function resolve(dir) {
  return path.join(__dirname, "../", dir);
}

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devServer: {
    host: "127.0.0.1",
    inline: false, // 启用热更新
    port: 8080,
    progress: true,
    contentBase: resolve("./"),
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    openPage: "../",
  },
  plugins: [
    new webpack.DefinePlugin({
      MODE: JSON.stringify("dev"),
      ENV: '"development"',
    }),
  ],
});
