var webpack = require('webpack');
var colors = require('colors');
var gutil = require("gulp-util");
// var cssLoaders = require('./css-loaders')

var controllerConfig = require('./controller.webpack.conf.js');
var viewConfig = require('./view.webpack.conf.js');

var configInfos = {
  controller: function (callback) {
    webpack(controllerConfig, function (err, stats) {
      if (err) throw new gutil.PluginError("controller in webpack error:", err);
      console.log("[webpack controller building]\n".bold.yellow, stats.toString({
        // output options
        chunks: true, // Makes the build much quieter
        colors: true
      }));
      if (callback) {
        console.log('cakkback controller :');
        callback();
      }
    });
  },
  view: function (callback) {
    webpack(viewConfig, function (err, stats) {
      if (err) throw new gutil.PluginError("view in webpack error:", err);
      console.log("[webpack view building]\n".bold.yellow, stats.toString({
        // output options
        chunks: true, // Makes the build much quieter
        colors: true
      }));
      if (callback) {
        console.log('cakkback view :');
        callback();
      }
    });
  }
};

configInfos.view();
configInfos.controller();

module.exports = configInfos;
