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
    active: { type: Boolean, default: false },
    age: { type: Number, required: true, min: 13, max: 120}
}); /* mongoose에 Account 스키마를 생성한다.,age에서는 필수라는 뜻의 required와 최소,최대값
    을 설정해 검증할 수 있게 했다. */4

Account.statics.findByAgeRange = function(min, max, callback) {
    this.find({ age: {$gt :min, $lte :max} }, callback );
};
/*findByAgeRange라는 정적 메소드를 구현해 최소,최대 나이를 인자로 받아
  해당되는 값이 있는 지 찾아준다 */

var AccountModel = mongoose.model('Account', Account); 
//Account스키마를 토대로 한 Account라는 이름의 mongoose 모델을 생성한다


var newUser = new AccountModel({ username: 'randomUser',age: 20 });
newUser.save();
// .save함수를 실행하면 몽고db가 필요한 insert 혹은 update 문을 실행하게 한다.
// save 하지 않을 시 모델의 변경사항은 저장되지 않는다.
console.log(newUser.username);
console.log(newUser.date_created);
console.log(newUser.visits);
console.log(newUser.active);
console.log(newUser.age);

AccountModel.findByAgeRange(18,30, function(err, accounts) {
    console.log(accounts.length);
});