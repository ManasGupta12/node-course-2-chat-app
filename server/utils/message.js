var moment=require('moment');
var generateMess=(from,text)=>{
	return {
		from,
		text,
		createdAt:moment().valueOf()
	};
};
var generateLocationMessage=(from,latitude,longitude)=>{
return {
  from,
  url:`https://www.google.com/maps?q=${latitude},${longitude}`,
  createdAt:moment().valueOf()
};
};
module.exports={generateMess,generateLocationMessage};
