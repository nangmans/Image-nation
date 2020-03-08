var async = require('async'),
    models = require('../models');

module.exports = {
    newest: function(callback) {
        models.Comment.find({},{},{ limit: 5, sort: {'timestamp': -1 }},
        function(err, comments) {
            var attachImage = function(comment, next) {
                models.Image.findOne({ _id : comment.image_id},
                function(err, image) {
                    if (err) throw err;
                    comment.image = image;
                    next(err);
                    
                });
            };
            
            async.each(comments, attachImage, //async의 each 함수는 첫번째 인자로 넘겨진 컬렉션을 순회하면서
                function(err) {               // 해당 항목을 두번째 인자로 넘겨진 콜백 함수의 인자로서 호출한다. 
                    if (err) throw err;     // 이를 통해 모든 댓글들을 순회하면서 attachImage가 실행된다.
                    callback(err, comments);  // 순회를 마친 후 실행되는 콜백은 newest 함수의 유일한 인자인 callback 함수를 실행한다.                   
            });
           
        })
    }
};