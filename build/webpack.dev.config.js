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
    inline: false,
    port: 8080,
    progress: true,
    contentBase: resolve("./"),
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      MODE: JSON.stringify("dev"),
      ENV: '"development"',
    }),
  ],
});
