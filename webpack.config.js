const { join, resolve } = require('path');
const babelrc = require('./babel');
const path = require('path');
const exclude = /(node_modules)/;
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, '/client/main.js')
    ],
    output: {
        path: path.join(__dirname, '/server/public/build/'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.tag.html'],
        modules: [resolve(__dirname, '../'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.tag.html$/,
                exclude: exclude,
                loader: 'riot-tag-loader',
                options: {
                    type: 'es6'
                }
            },
            {
                test: /\.js$/,
                exclude: exclude,
                loader: 'babel-loader',
                options: babelrc
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
};