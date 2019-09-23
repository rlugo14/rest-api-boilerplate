require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	},
	externals: [nodeExternals()],
	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(process.env)
		}),
		new ForkTsCheckerWebpackPlugin({
			checkSyntacticErrors: true
		})
	],
	entry: './src/server.ts',
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js' ]
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	}
};
