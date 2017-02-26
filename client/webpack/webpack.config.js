const { join, resolve } = require('path');
const babelrc = require('./babel');

const out = join(__dirname, '../../server/public/build/');
const exclude = /(node_modules)/;

module.exports = {
    entry: {
        app: './main.js'
    },
    output: {
        path: out,
        filename: 'bundle.js'
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
    plugins: [],
};