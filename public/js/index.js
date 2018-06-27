var socket=io();// it initiates the request we are making arequest from the client to server to open up web socket and keep that connection open.
	socket.on('connect',function(){
 console.log('connected to server');
 
 //email from client to server.It contain message
 // socket.emit('createEmail',{
 // 	to:'manan@example.com',
 // 	text:'Hey.bhai whatsup'
 // });
  
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
   	var li=jQuery('<li></li>');
   	li.text(`${mess.from}: ${mess.text}`);

   	jQuery('#messages').append(li);
   });
 //   socket.emit('newCreateMessage',{
 // 	from:'Manan Gupta',
 // 	text:'Hey'
 // 	}, function (data) {
 // 	console.log('Got it.',data);
 // });

jQuery('#Message-form').on('submit',function(e){
 e.preventDefault();

 socket.emit('newCreateMessage',{
 	from:'User',text:jQuery('[name=Message]').val()
 },function(){

 });
});


