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
                    'css-loader',
                ]
            },
            {
                test: /\.jsx?$/,
                use: ['react-hot-loader/webpack'],
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
};