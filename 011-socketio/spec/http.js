/**
    Several specs of socket.io.

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

/*
    Use a NameSpace.
*/
io.of('/myspace').on('connect', function (socket) {
    console.log('myspace:connected:', socket.id)
    socket.emit('mynews', { text : 'hello my news '})
})

/*
    Send to a specified user.
*/
const ns1 = io.of('specified_user')
ns1.on('connect', function (socket) {
    ns1.to(socket.id).emit('hi', { text : socket.id })
})

/*
    Send a broadcast message (send everyone except me).
*/
const ns2 = io.of('broadcast')
ns2.on('connect', function (socket) {
    socket.broadcast.emit('hi', { text : `${socket.id} is joined` })
})

/*
    Use a Room.
*/
const ns3 = io.of('room')
ns3.on('connect', function (socket) {
    // The room name.
    const roomName = 'my room'
    // Enter the room.
    socket.join(roomName)
    // Send to all members in the room.
    ns3.to(roomName).emit('msg1', 'hi')
    // Send as broadcast.
    socket.broadcast.to(roomName).emit('msg2', 'hi')
    // Send to a specific user like below.
    // ns3.to(socket.id).emit('hi', { text : socket.id })
})