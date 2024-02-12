// imports
var http = require('http')
var express = require('express')
var ejs = require('ejs')
const { Server } = require('socket.io')
const cors = require('cors')

// express
var app = express()

// cross-origin resource sharing
app.use(cors())


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

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // frontend
        methods : ['GET', 'POST']
    }
})

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`)

    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    })
})

server.listen(3001) // backend
console.log('server is up and running on http://localhost:3001/')