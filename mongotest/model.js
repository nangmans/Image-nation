var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mongotest');
mongoose.connection.on('open', function() {
    console.log('Mongoose connected.');
});

var Account = new Schema({
    username: {type : String },
    date_created: {type : Date, default: Date.now},
    visits: { type: Number, default: 0},
    active: { type: Boolean, default: false }
}); //mongoose에 Account 스키마를 생성한다.

var AccountModel = mongoose.model('Account', Account); 
//Account스키마를 토대로 한 Account라는 이름의 mongoose 모델을 생성한다.
var newUser = new AccountModel({ username: 'randomUser' });
newUser.save();
console.log(newUser.username);
console.log(newUser.date_created);
console.log(newUser.visits);
console.log(newUser.active);
