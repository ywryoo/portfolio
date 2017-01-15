/**
 * Created by Yangwook Ryoo on 1/28/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict'

import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import eslint from 'gulp-eslint'
import webpack from 'webpack'
import del from 'del'
import path from 'path'
import merge from 'merge-stream'
import * as config from './tools/config.js'

/* clean dist/public directory before start */
gulp.task('clean', () => {
  return del(['dist/public/**/*', 'dist/content/**/*'])
})

/* copy static files and server.js */
gulp.task('copy', ['clean'], () => {
  let js = gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/foundation-sites/dist/js/foundation.min.js',
    'node_modules/foundation-sites/dist/js/plugins/foundation.util.mediaQuery.js',
    'node_modules/foundation-sites/dist/js/plugins/foundation.util.triggers.js',
    'node_modules/foundation-sites/dist/js/plugins/foundation.util.box.js',
    'node_modules/foundation-sites/dist/js/plugins/foundation.util.keyboard.js',
    'node_modules/foundation-sites/dist/js/plugins/foundation.util.motion.js'
    ])
    .pipe(gulp.dest('dist/public/js/lib/'))

  let other = gulp.src('src/public/**/*')
    .pipe(gulp.dest('dist/public/'))

  let css = gulp.src('node_modules/foundation-sites/dist/css/foundation.min.css')
    .pipe(gulp.dest('dist/public/css/lib/'))

  let content = gulp.src('src/content/**/*')
    .pipe(gulp.dest('dist/content/'))

  return merge(js, other, css, content)
})

//showing error or done
function onBuild(done) {
  return (err, stats) => {
    if(err) {
      console.log('Error', err)
    }
    else {
      console.log(stats.toString({chunks:false}))
    }
    if(done) {
      done()
    }
  }
}

/* build server with sourcemap */
gulp.task('buildServer', done => {
  webpack(config.webpackServerConfig)
  .run(onBuild(done))
})

gulp.task('watchServer', () => {
  webpack(config.webpackServerConfig)
  .watch(100, onBuild())
})

/* watch change of source except client js/jsx files */
gulp.task('watch', ['watchServer'], () => {
  gulp.watch(['src/public/**/*', 'src/content/**/*'], ['copy'])       //copy file change -> rerun copy
})

/* lint js/jsx files */
gulp.task('lint', () => {
  return gulp.src(['src/**/*.jsx'],['src/**/*.js'])
    .pipe(eslint(config.lintConfig))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  //TODO need to customize rules and scope
})

/* bundle/build for production */
gulp.task('startProduction', ['buildServer', 'copy'], () => {
  return console.log("build for production done")
})

/* bundle/build for deploy */
gulp.task('start',['buildServer', 'copy'], () => {
  return console.log("build done")
})

/* run application in localhost by default */
gulp.task('default',['watch', 'copy'], () => {
  nodemon({
    script: 'dist/server.js',
    watch: 'dist/**/*',
    env: {
      'NODE_ENV': 'development',
      'NODE_PATH': path.join(__dirname+'/dist')
      }
  })   //run nodemon to start server
})
