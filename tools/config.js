/**
 * Created by Yangwook Ryoo on 2/1/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import fs from 'fs';

export const lintConfig = {
  extends: 'eslint:recommended',
  ecmaFeatures: {
    'modules': true,
    "jsx": true
  },
  "env": {
    "es6": true,
    "node": true,
    "commonjs": true,
    "browser": true
  },
  "rules": {
    "no-unused-vars": 1
  }
};

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });
  //TODO Analyze this code

export const webpackAppConfig = {
  entry: ['babel-polyfill', './src/app.jsx'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
          plugins: ["syntax-async-functions", "transform-regenerator", "transform-class-properties"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "postcss", "sass"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ],
  postcss: [
    autoprefixer( {
      browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
    })
  ],
  output: {
    path: "dist/public/",
    filename: 'app.min.js'
  }
};
export const webpackServerConfig = {
  entry: ['babel-polyfill', './src/server.js'],
  target:"node",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
          plugins: ["syntax-async-functions", "transform-regenerator", "transform-class-properties"]
        }
      }
    ]
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
  devtool:"sourcemap",
  output: {
    path: "dist/",
    filename: 'server.js'
  }
};