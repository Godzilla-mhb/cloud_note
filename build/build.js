require('./check-versions')()
var utils = require('./utils')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var webpackProdConfig = require('./webpack.prod.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var spinner = ora('building for ' + process.env.NODE_ENV)
spinner.start()
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackProdConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    _resolve()
  })

})

module.exports = {
  ready: readyPromise
}
