/**
    Server-side javascript for socket.io (using express module).

    How to run.
        - $ node express.js 
*/
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(7000)

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html')
})

io.on('connect', function (socket) {
    console.log('connected:', socket.id)
    socket.emit('news', { text : 'hello world'})
    socket.on('my other event', function (data) {
        console.log('my other event:', data)
    })
})