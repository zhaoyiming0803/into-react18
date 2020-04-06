const baseWebpackConfig = require("./webpack.base.config");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyjsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "../", dir);
}

const date = new Date();

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM",
    "react-redux": "ReactRedux",
    // axios: "axios",
  },
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: resolve("static"), to: resolve("dist/static-copy") },
    ]),
    new webpack.BannerPlugin(
      `created ${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()} by zhaoyiming`
    ),
    new webpack.DefinePlugin({
      MODE: JSON.stringify("prod"),
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 100, // Minimum number of characters
    }),
    new CleanWebpackPlugin({}),
  ],
});
