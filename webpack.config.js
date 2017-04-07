const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

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

  plugins: [
		new WebpackShellPlugin({
			onBuildStart : ['jscodeshift -t node_modules/flow-immutable-models/lib/transform.js src/Models.js']
		})
  ],

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
