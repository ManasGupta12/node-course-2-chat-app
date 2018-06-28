var moment=require('moment');


var someTime=moment().valueOf();
var createdAt=1234
var date=moment(createdAt);
console.log(someTime);
// date.subtract(1,'years');
// console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm A'));