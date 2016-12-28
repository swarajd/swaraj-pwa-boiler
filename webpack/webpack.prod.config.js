const webpack = require('webpack');
// remember we installed this at the beginning? Now we're using it.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {

    context: __dirname,

    // entry tells webpack where to start looking.
    entry: {
        app: path.join(__dirname, '../src/'),
        // vendor: ['ramda'],
    },
    /**
     * output tells webpack where to dump the files it has processed.
     * [name].[hash].js will output something like app.3531f6aad069a0e8dc0e.js
     */
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../build/'),
    },

    module: {
        loaders: [ // Loaders allow you to preprocess files!
            {
                test: /\.(js)$/, // look for .js files
                exclude: /node_modules/,
                loader: 'babel-loader', // preprocess with that babel goodness we installed earlier
                query: {
                    cacheDirectory: true,
                },
            },
        ],
    },

    plugins: [
        /**
        * HtmlWebpackPlugin will make sure our JavaScript files are being called
        * from within our index.html
        */
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            filename: 'index.html',
            inject: 'body',
        }),

        // Only running UglifyJsPlugin() in production
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                'screw_ie8': true,
                'warnings': false,
                'unused': true,
                'dead_code': true,
            },
            output: {
                comments: false,
            },
            sourceMap: false,
        }),

        new SWPrecacheWebpackPlugin(
            {
                cacheId: 'flickr-project',
                filename: 'my-service-worker.js',
                maximumFileSizeToCacheInBytes: 4194304,
                stripPrefix: path.resolve(__dirname, '../build') + '/',
                replacePrefix: ''
            }
        ),
    ],
}
