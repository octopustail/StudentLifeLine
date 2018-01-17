const path = require('path');
const entryPath = path.resolve(__dirname, 'client-src', 'index.js');
const webpack = require('webpack');

module.exports = {
    entry: entryPath,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './public',
        port: 8080,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.eot/,
                loader: 'file-loader?prefix=font/'
            }, {
                test: /\.woff/,
                loader: 'file-loader?prefix=font/&limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf/,
                loader: 'file-loader?prefix=font/'
            }, {
                test: /\.svg/,
                loader: 'file-loader?prefix=font/'
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
};