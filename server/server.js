const path=require('path');
const socket=require('socket.io');
const express =require('express');
const http=require('http');

const public=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app =express();
var server=http.createServer(app);
var io=socket(server);

app.use(express.static(public));
io.on('connection',(socket)=>{
console.log('new user connected');

socket.on('disconnect',()=>{
		console.log('disconnected from the server');
	});
});
server.listen(port,()=>{
	console.log(`server is up on ${port}`);
});