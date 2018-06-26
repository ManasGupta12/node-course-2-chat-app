var socket=io();// it initiates the request we are making arequest from the client to server to open up web socket and keep that connection open.
	socket.on('connect',function(){
 console.log('connected to server');
 
 //email from client to server.It contain message
 // socket.emit('createEmail',{
 // 	to:'manan@example.com',
 // 	text:'Hey.bhai whatsup'
 // });
 socket.emit('newCreateMessage',{
	to:'Manan Gupta',
	text:'Hey.I am on client side',
	from:'Manas Gupta'
});
	});
	socket.on('disconnect',function(){
		console.log('disconnected from the server');
	});

    //Establishing server from server side
	// socket.on('newEmail',function(email){
	// 	console.log('new email',email);
	// });
   socket.on('newMessage',function(mess){
   	console.log('NEW MESSAGE',mess);
   });