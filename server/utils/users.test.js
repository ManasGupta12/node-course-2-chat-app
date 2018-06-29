const expect=require('expect');

const {Users}=require('./users');

describe('Users',()=>{
var users;

    beforeEach(()=>{
     users=new Users();
     users.users=[{
     	id:'1',
			name:'Manan',
			room:'class'
		},{
     	id:'2',
			name:'Brajesh',
			room:'class'
     },{
     	id:'3',
			name:'Henry',
			room:'React course'
     }];
    });

	it('should add new user',()=>{
		var users=new Users();
		var user={
			id:'12334',
			name:'Manas',
			room:'FRIENDS'
		};
		var resuser=users.addUser(user.id,user.name,user.room);
	 expect(users.users).toEqual([user]);
	});
    it('should remove user',()=>{
    var userid='1';
    var user=users.removeUser(userid);

    expect(user.id).toBe(userid);
    expect(users.users.length).toBe(2);
    });
    it('should not remove user',()=>{
    var userid='12';
    var user=users.removeUser(userid);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
    });
    it('should find user',()=>{
    var userid='2';
    var user=users.getUser(userid);
    expect(user.id).toBe(userid)
    });
    it('should not find user',()=>{
     var userid='23';
    var user=users.getUser(userid);
    expect(user).toNotExist();
    });



    it('should return users for class',()=>{
    	var userList=users.getUserList('class');
    	 expect(userList).toEqual(['Manan','Brajesh']);
    });
it('should return users for React course',()=>{
    	var userList=users.getUserList('React course');
    	 expect(userList).toEqual(['Henry']);
    });
});