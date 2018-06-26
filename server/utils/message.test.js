var expect=require('expect');

var {generateMess}=require('./message');

describe('generateMess',()=>{
	it('should generate correct message object',()=>{
     var from='Manan';
     var text='hello';
     var message=generateMess(from,text);
     expect(message.createdAt).toBeA('number');
     expect(message).toInclude({from,text});	
 });
});