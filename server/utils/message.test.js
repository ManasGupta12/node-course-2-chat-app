var expect=require('expect');

var {generateMess,generateLocationMessage}=require('./message');

describe('generateMess',()=>{
	it('should generate correct message object',()=>{
     var from='Manan';
     var text='hello';
     var message=generateMess(from,text);
     expect(message.createdAt).toBeA('number');
     expect(message).toInclude({from,text});	
 });
});
describe('generateLocationMessage',()=>{
	it('should give cuurent location object',()=>{
		var from='hena';
		var latitude=15;
		var longitude=23;
		var url='https://www.google.com/maps?q=15,23';
		var message=generateLocationMessage(from,latitude,longitude);
		 expect(message.createdAt).toBeA('number');
       expect(message).toInclude({from,url});
	})
})