var models = require('../models'),
    async = require('async');

module.exports = function(callback) {
    async.parallel([
        function(next) {
            models.Image.count({},next); //Image 컬렉션의 도큐먼트 개수를 세서(count) next콜백으로 넘겨준다
        },
        function(next) {
            models.Comment.count({},next); //위의 image 경우와 동일하다
        },
        function(next) {
            models.Image.aggregate([{ $group: { //count는 도큐먼트의 개수만을 세기 때문에 views를 찾기 위해서는 aggregate를 사용해야 한다.
                _id : '1',                      //모든 도큐먼트들을 그룹핑한 뒤 그것들의 뷰들을 모두 더한다.
                viewsTotal : { $sum : '$views' } //aggregate의 첫번쨰 인자는 []로 감싸주어야 한다
            }}], function (err, result) {
                 var viewsTotal = 0;
                 if (result.length > 0) {
                     viewsTotal += result[0].viewsTotal;
                 }
                 next(null, viewsTotal);
            });
        }, 
        function(next) {
            models.Image.aggregate([{ $group: { 
                _id : '1',                     
                likesTotal : { $sum : '$likes' }
            }}], function (err, result) {
                 var likesTotal = 0;
                 if (result.length > 0) {
                    likesTotal += result[0].likesTotal;
                 }
                 next(null, likesTotal);
            });
        }
    ], function(err, results) {
        callback(null, {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3]
        });
    });
}
