// import './lib/db'
import express from 'express'
import httpProxy from 'http-proxy'
// import countryRoutes from './routes/country'

const app = express()
const proxy = httpProxy.createProxyServer()
const port = process.env.PORT || 3333

// app.use(express.json())
// app.use(express.raw({ type: 'application/vnd.custom-type' }))
// app.use(express.text({ type: 'text/html' }))
app.use('/proxy/openai', (req, res) => {
  console.log(req.url)
  proxy.web(req, res, {
    target: 'https://api.openai.com',
    changeOrigin: true
  })
})
app.get('/', async (req, res) => {
  res.send({ message: 'Please visit /countries to view all the countries' })
})

// app.use('/countries', countryRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
