var express = require('express')
var fileRouter = require('./routers/file')
const path = require('path')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9999
var crossSite = require('./utils/cross-site')
var bodyParser = require('body-parser') // 请求头解析中间件
// var clientErrorHandler = require('./middleware/clientErrorHandler.js')
// var errorHandler = require('./middleware/errorHandler.js')
// var Interceptor = require('./middleware/Interceptor.js')
var request = require('request')
app.set('port', port)
app.use(express.static(path.resolve(__dirname, '../static'))) // 静态资源
app.use(bodyParser.json({limit: '2048kb'})) // 请求内容2G
app.use(bodyParser.urlencoded({ extended: false }))
app.use(crossSite)
app.use('/file', fileRouter)
// app.use(Interceptor)
// 错误处理
// app.use(clientErrorHandler)
// app.use(errorHandler)
// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port)
