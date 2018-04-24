const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer()

const server = http
  .createServer((req, res) => {
    proxy.web(req, res, {
      target: /^\/(journeylogs)/.test(req.url)
        ? 'given_API_End_Point'
        : 'http://localhost:3000',
      changeOrigin: true
    })

    proxy.on('error', e => {
      console.log(e)
    })
  })
  .listen(8080)

server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

process.on('uncaughtException', function (err) {
    console.log(err);
});