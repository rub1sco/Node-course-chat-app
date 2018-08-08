var moment = require('moment');
// var date = moment();
//
//
// //date.add(1,'year')
// console.log(date.format('MMM Do, YYYY'))
//
// //10:36
// console.log(date.format('h:mm a'))
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);


var createdAt = 1235;
var date = moment(createdAt);

console.log(date.format('h:mm a'));
