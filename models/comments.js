var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    image_id : { type : ObjectId }, //ObjectId를 통해 이미지와 댓글의 관계 생성
    email : { type : String },
    name : { type : String },
    gravatar: { type : String },
    comment : { type : String },
    timestamp : { type : Date, 'default' : Date.now }
});

CommentSchema.virtual('image').set(function(image) {
    this._image = image;
}).get(function() {
    return this._image;
});

module.exports = mongoose.model('Comment', CommentSchema);