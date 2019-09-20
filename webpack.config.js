const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const main = [
	'core-js',
	'./src/server.ts'
];

module.exports = {
	context: process.cwd(), // to automatically find tsconfig.json
	entry: {
		main
	},
	target: "node",
	externals: [nodeExternals()],
	output: {
		path: path.join(process.cwd(), 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /.ts?$/,
				use: [
					{ loader: 'cache-loader' },
					{
						loader: 'thread-loader',
						options: { workers: require('os').cpus().length - 1,}
					},
					{
						loader: 'ts-loader',
						options: { happyPackMode: true }
					}
				],
				include: [path.resolve('src'), path.resolve('node_modules')]
			}
		]
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			checkSyntacticErrors: true
		}),
	],
	resolve: {
		extensions: [".ts", ".js"],
	}
};