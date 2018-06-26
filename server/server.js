const path=require('path');
const socket=require('socket.io');
const express =require('express');
const http=require('http');
const {generateMess}=require('./utils/message');

const public=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app =express();
var server=http.createServer(app);
var io=socket(server);

app.use(express.static(public));
io.on('connection',(socket)=>{       //io.on is only for connection event
console.log('new user connected');

//email from server to client.This message will be there at client side
// socket.emit('newEmail',{
// 	from:`manas@example.com`,
// 	text:`hello`,
// 	createAt:123
// });
// socket.emit('newMessage',{
// 	from:'Manas Gupta',
// 	text:'Hey.I am on server side',
// 	createdAt:632
// });
//establishing server from client side
// socket.on('createEmail',(newEmail)=>{
//   console.log('createEmail',newEmail);   
// });
 
   	socket.emit('newMessage',generateMess('Admin','Welcome to chat app'));
   	socket.broadcast.emit('newMessage',generateMess('Admin','New user joined'));
   	socket.on('newCreateMessage',(mess)=>{
   	console.log('Create MESSAGE',mess);

   	io.emit('newMessage',generateMess(mess.from,mess.text));
   	// socket.broadcast.emit('newMessage',{
   	//     from:mess.from,
   	// 	text:mess.text,
   	//  	createdAt:new Date().getTime()
   	// });
   });

socket.on('disconnect',()=>{
		console.log('disconnected from the server');
	});
});
server.listen(port,()=>{
	console.log(`server is up on ${port}`);
});