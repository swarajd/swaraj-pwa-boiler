const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config'); // haven't created this yet. No sweat.
const path = require('path');

const env = { dev: process.env.NODE_ENV };

const devServerConfig = {
  contentBase: path.join(__dirname, '../src/'),
  hot: true,
  inline: true
};

/**
 * Creating the server to listen to. We are passing in our webpack config
 * that we will setup at webpack/webpack.config.js. We are also passing in
 * the server configuration object that we created above.
 */
const server = new WebpackDevServer(webpack(webpackConfig(env)), devServerConfig);

// will be live at http://localhost:3000/
server.listen(3000, 'localhost');

