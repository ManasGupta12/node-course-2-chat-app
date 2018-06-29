var socket=io();// it initiates the request we are making arequest from the client to server to open up web socket and keep that connection open.
	
 function scrolltobottom(){
 	var messages=jQuery('#messages');
 	var newmess=messages.children('li:last-child');
 	var clientHeight=messages.prop('clientHeight');
 	var scrollTop=messages.prop('scrollTop');
 	var scrollHeight=messages.prop('scrollHeight');
 	var newmessheight=newmess.innerHeight();
 	var lastmessheight=newmess.prev().innerHeight();

 	if(clientHeight + scrollTop + newmessheight + lastmessheight >=scrollHeight ){
 		messages.scrollTop(scrollHeight);
 	}
 }

	socket.on('connect',function(){
 var params=jQuery.deparam(window.location.search);

 socket.emit('join',params,function(err){
 	if(err){
 		alert(err);
 		window.location.href='/';
 	}
 else{
 console.log('No error');
 }
 });
 
 //email from client to server.It contain message
 // socket.emit('createEmail',{
 // 	to:'manan@example.com',
 // 	text:'Hey.bhai whatsup'
 // });
  
	});
	socket.on('disconnect',function(){
		console.log('disconnected from the server');
	});

    socket.on('updateUserList',function(users){
    	var ol=jQuery('<ol></ol>');

    	users.forEach(function (user){
    		ol.append(jQuery('<li></li>').text(user));
    	});
    	jQuery('#users').html(ol);
    })

    //Establishing server from server side
	// socket.on('newEmail',function(email){
	// 	console.log('new email',email);
	// });
   socket.on('newMessage',function(mess){
   	var formattime=moment(mess.createdAt).format('h:mm a');
   	var template=jQuery("#message-template").html();
   	var html=Mustache.render(template,{
   		text:mess.text,
   		from:mess.from,
   		createdAt:formattime
   	});
   	jQuery('#messages').append(html);
   	scrolltobottom();
   	
   	// console.log('NEW MESSAGE',mess);
   	// var li=jQuery('<li></li>');
   	// li.text(`${mess.from} ${formattime}: ${mess.text}`);
   	// jQuery('#messages').append(li);
   });

   socket.on('newLocationMessage',function(mess){
    var formattime=moment(mess.createdAt).format('h:mm a');
    var template=jQuery("#location-message-template").html();
    var html=Mustache.render(template,{
   	    from:mess.from,
   	    url:mess.url,
   		createdAt:formattime
   	});
   	jQuery('#messages').append(html);
   	scrolltobottom();
   	// var li=jQuery('<li></li>');
   	// var a=jQuery('<a target="_blank">My Current Location</a>');
   	// li.text(`${mess.from} ${formattime}: `);
   	// a.attr('href',mess.url);
   	// li.append(a);
   	// jQuery('#messages').append(li);
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
locButton.attr('disabled','disabled').text('Sending location .....');

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



