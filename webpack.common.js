const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: {
    popup: "./src/popup/popup.tsx",
    options: "./src/options/options.tsx",
    background: "./src/background/background.ts",
    contentScript: "./src/contentScript/contentScript.ts",
    newTab: "./src/newTab/newTab.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
        test: /\.css$/,
      },
      {
        type: "asset/resource",
        use: "asset/resource",
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
      },
    ],
  },
  output: {
    filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve("dist"),
        },
      ],
    }),
    ...getHtmlPluginConfig(["popup", "options", "newTab"]),
  ],
};

function getHtmlPluginConfig(names) {
  return names.map((name) => {
    return new htmlWebpackPlugin({
      filename: `${name}.html`,
      chunks: [name],
    });
  });
}
