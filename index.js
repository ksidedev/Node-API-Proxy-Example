const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer()

const server = http
  .createServer((req, res) => {
    proxy.web(req, res, {
      target: 'http://laptop.local:3000/', // URL
      /* target: /^\/(path)/.test(req.url)
         ? 'given_API_End_Point domain before the /'
         : 'http://localhost:3000', */
      changeOrigin: true
    })

    proxy.on('error', e => {
      console.log(e)
    })
  })
  .listen(3003) // endpoint to point to

server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

process.on('uncaughtException', function (err) {
    console.log(err);
});