const path=require('path');
const socket=require('socket.io');
const express =require('express');
const http=require('http');
const {generateMess,generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validator');
const {Users}=require('./utils/users');

const public=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app =express();
var server=http.createServer(app);
var io=socket(server);
var users=new Users();






app.use(express.static(public));
io.on('connection',(socket)=>{       
console.log('new user connected');

socket.on('join',(params,callback)=>{
       if(!isRealString(params.name)|| !isRealString(params.room))
       	{ return callback('Name and Room are required');
   }
   socket.join(params.room);
   users.removeUser(socket.id);
   users.addUser(socket.id,params.name,params.room)
   
   io.to(params.room).emit('updateUserList',users.getUserList(params.room));
   socket.emit('newMessage',generateMess(params.room,'Welcome to chat app'));
  socket.broadcast.to(params.room).emit('newMessage',generateMess(params.room,`${params.name} has joined`));
   callback();
    });


   	socket.on('newCreateMessage',(mess,callback)=>{
   	var user=users.getUser(socket.id);

   	if(user &&isRealString(mess.text)){
     
   		io.to(user.room).emit('newMessage',generateMess(user.name,mess.text));
   	}
  callback();
   	
   });
   	socket.on('createLocationMessage',(coords)=>{
   		var user=users.getUser(socket.id);

   	if(user){
 io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
   	
   	};
   });

socket.on('disconnect',()=>{
		var user=users.removeUser(socket.id);

		if(user){

			io.to(user.room).emit('updateUserList',users.getUserList(user.room));
			io.to(user.room).emit('newMessage',generateMess(params.room,`${user.name} has left`));
		}
	});
});
server.listen(port,()=>{
	console.log(`server is up on ${port}`);
});