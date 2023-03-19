const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

Empresa_A = {nome:"Empresa A", abertura:Math.random() * (50 - 25 + 1) + 25, preco:0}
Empresa_B = {nome:"Empresa B", abertura:Math.random() * (50 - 25 + 1) + 25, preco:0}
Empresa_C = {nome:"Empresa C", abertura:Math.random() * (50 - 25 + 1) + 25, preco:0}
Empresa_A.preco=Empresa_A.abertura
Empresa_B.preco=Empresa_B.abertura
Empresa_C.preco=Empresa_C.abertura

setInterval(()=>{Empresa_A.preco+=Math.random() * 2 - 2;changeStocks(Empresa_A)}, Math.random() * (7000))
setInterval(()=>{Empresa_B.preco+=Math.random() * 2 - 2;changeStocks(Empresa_B)}, Math.random() * (7000))
setInterval(()=>{Empresa_C.preco+=Math.random() * 2 - 2;changeStocks(Empresa_C)}, Math.random() * (7000))

io.on('connection', (socket) => {
  socket.on('compra', (msg)=>{
    notificarCompra(socket.id, msg)
  })

  socket.on('venda', (msg)=>{
    notificarVenda(socket.id, msg)
  })
});

function notificarCompra(id, msg){
  io.emit('compra', JSON.stringify({id:id, compra:msg}))
}

function notificarVenda(id, msg){
  io.emit('venda', JSON.stringify({id:id, venda:msg}))
}


function changeStocks(msg){
  io.emit('changeStocks', JSON.stringify(msg))
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});