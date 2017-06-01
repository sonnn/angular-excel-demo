var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: process.cwd(),
	entry: {
		'library': [
			'rxjs',
			'zone.js',
			'@angular/common',
			'@angular/compiler',
			'@angular/core',
			'@angular/forms',
			'@angular/http',
			'@angular/platform-browser',
			'@angular/platform-browser-dynamic',
			'@angular/router'
		],
	},
	output: {
		filename: '[name].dll.js',
		path: path.join(__dirname, './src/public/dist/lib'),
		library: '[name]',
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			path.resolve(__dirname, './src/public')
		),
		new webpack.DllPlugin({
			name: '[name]',
			path: path.join(__dirname, './src/public/dist/lib', '[name]-manifest.json')
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};
