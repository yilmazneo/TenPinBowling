const path = require('path');

module.exports = {
  mode: 'development',
  entry: './jsx/app.jsx',
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'bundle.js',
  },
  devtool: '#sourcemap',
  devServer: {
    overlay: true,
    publicPath: '/js/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
    ],
  },
};
