require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var appData = require('../data.json'); //引入json文件
var appBegin = require('../begin.json'); //引入json文件
var appCinema = require('../cinema.json'); //引入json文件
var appCinemaDetail = require('../cinemaDetail.json'); //引入json文件
var appBankCard = require('../bankCard.json'); //引入json文件
var appBuyMovieMsg = require('../buyMovieMsg.json'); //引入json文件
var appBuySeats = require('../buySeats.json'); //引入json文件
var data = appData.data;//接口一
var begin = appBegin.data;//接口二
var cinema = appCinema.data;//接口三
var buy = appCinemaDetail.data;//接口四
var bankCard = appBankCard.data;//接口五
var buyMovieMsg = appBuyMovieMsg.data;//接口六
var buySeats = appBuySeats.data;//接口七
// 定义路由
var apiRoutes = express.Router();
// seller借口的读取数据
apiRoutes.get('/data',function(req,res){
  res.json({
    data : data
  });
});
apiRoutes.get('/begin',function(req,res){
  res.json({
    data : begin
  });
});
apiRoutes.get('/cinema',function(req,res){
  res.json({
    data : cinema
  });
});
apiRoutes.get('/buy',function(req,res){
  res.json({
    data : buy
  });
});
apiRoutes.get('/bank',function(req,res){
  res.json({
    data : bankCard
  });
});
apiRoutes.get('/moviecard',function(req,res){
  res.json({
    data : buyMovieMsg
  });
});
apiRoutes.get('/buyseats',function(req,res){
  res.json({
    data : buySeats
  });
});


app.use('/api',apiRoutes);//注册路由


var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
