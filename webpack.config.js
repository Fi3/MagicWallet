var path = require("path");

module.exports = {
	entry: {
		app: [
      './src/index.js'
    ]
  },

  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
			},
			{
				test: /\.html$/,
				loader: "file-loader?name=[name].[ext]",
			},
    ],

  },

  devServer: {
    inline: true,
    stats: { colors: true },
    host: '0.0.0.0'
  },


};
