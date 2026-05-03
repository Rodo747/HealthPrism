const http = require('http')
const https = require('https')
const { URL } = require('url')

const PORT = 8080
const TARGET = 'https://healthprism-production.up.railway.app'

const server = http.createServer((req, res) => {
  const targetUrl = new URL(TARGET + req.url)

  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port || 443,
    path: targetUrl.pathname + targetUrl.search,
    method: req.method,
    headers: {
      ...req.headers,
      host: targetUrl.hostname,
    },
  }

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, { end: true })
  })

  proxyReq.on('error', (e) => {
    res.writeHead(502, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: e.message }))
  })

  req.pipe(proxyReq, { end: true })
})

server.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`)
})
