const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3002;
const server = app.listen(port, () => console.log(`Server on port ${port}`));
const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));
let socketConnected = new Set()
io.on('connection', onConnected);
function onConnected(socket) {
  console.log(socket.id);
  socketConnected.add(socket.id)
   io.emit('clients-total', socketConnected.size)
  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
    socketConnected.delete(socket.id)
    io.emit('clients-total', socketConnected.size)
     })

     socket.on('message',(data)=>{
      console.log(data)
      socket.broadcast.emit('chat-message', data)
     })
}
