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
   	var formattime=moment(mess.createdAt).format('h:mm a');
   	console.log('NEW MESSAGE',mess);
   	var li=jQuery('<li></li>');
   	li.text(`${mess.from} ${formattime}: ${mess.text}`);
   	jQuery('#messages').append(li);
   });

   socket.on('newLocationMessage',function(mess){
    var formattime=moment(mess.createdAt).format('h:mm a');
   	var li=jQuery('<li></li>');
   	var a=jQuery('<a target="_blank">My Current Location</a>');
   	li.text(`${mess.from} ${formattime}: `);
   	a.attr('href',mess.url);
   	li.append(a);
   	jQuery('#messages').append(li);
  });
 //   socket.emit('newCreateMessage',{
 // 	from:'Manan Gupta',
 // 	text:'Hey'
 // 	}, function (data) {
 // 	console.log('Got it.',data);
 // });
var messagetext=jQuery('[name=Message]');

jQuery('#Message-form').on('submit',function(e){
 e.preventDefault();

 socket.emit('newCreateMessage',{
 	from:'User',text:messagetext.val(),
 },function(){
 messagetext.val('');
 });
});
var locButton=jQuery('#send-location');
locButton.on('click',function(){
if(!navigator.geolocation){
	return alert('Geolocation not supported by user');
}
locButton.attr('disabled','disabled').text('Sending loaction .....');

navigator.geolocation.getCurrentPosition( function (position) {
	locButton.removeAttr('disabled').text('Send location');
socket.emit('createLocationMessage',{
	latitude:position.coords.latitude,
	longitude:position.coords.longitude
});
},function(){
	locButton.removeAttr('disabled').text('Send location');
	alert('Unable to fetch location');
});
});



