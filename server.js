// imports
var http = require('http')
var express = require('express')
var ejs = require('ejs')

// express
var app = express()

// ejs & view engine setup
app.engine('html', ejs.renderFile)
app.set('view engine', 'html') //app.set('view engine', 'ejs')
app.set('views', './views')

// disable static files caching
app.use(express.static('./static', { etag: false}))
app.set('etag', false)

app.get('/', (req, res) => {
    res.render('index')
})

http.createServer(app).listen(3000)

console.log('server is up and running on http://localhost:3000/')