var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path');

var ImageSchema = new Schema({
    title: { type : String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, 'default': 0},
    likes: { type: Number, 'default': 0},
    timestamp: { type: Date, 'defualt': Date.now}
});
// Image에 대한 스키마인 ImageScheam 명세 생성
ImageSchema.virtual('uniqueId')
.get(function() {
    return this.filename.replace(path.extname(this.filename), '');
}); //가상 프로퍼티인 uniqueId 생성, 파일 확장자를 제거한 파일명

module.exports = mongoose.model('Image',ImageSchema);
/*스키마가 아닌 모델을 exports 했다는 점에 유의, 스키마를 exports하는 것은 의미가 없다
실제하는 것인 모델을 export해야 함 */