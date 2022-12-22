const path = require("path");

module.exports = {
  entry: "./app.tsx",
  output: {
    filename: "bundle.js", //nome do bundle a ser criado
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
