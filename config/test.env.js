var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  // clientHost: '"http://testqx.1sju.com/mall-web"',
  // adminHost: '"http://testqx.1sju.com/mall-admin"',
  uploadHost: '"http://39.106.101.68:8765/"',

  clientHost: '"http://39.106.101.68:8765/"',
  adminHost: '"http://39.106.101.68:8763/"'
})
