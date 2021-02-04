const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill', // enables async-await
    './src/main.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
