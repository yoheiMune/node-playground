/**
    Server-side javascript for socket.io (using http module).

    How to run.
        - $ node http.js 
*/
const app = require('http').createServer(handler)
const io = require('socket.io')(app)
const fs = require('fs')

app.listen('7000')

function handler (req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500)
            return res.send('Error loading index.html')
        }
        res.writeHead(200)
        res.end(data)
    })
}

io.on('connect', function (socket) {
    console.log('connected:', socket.id)
    socket.emit('news', { text : 'hello world'})
    socket.on('my other event', function (data) {
        console.log('my other event:', data)
    })
})