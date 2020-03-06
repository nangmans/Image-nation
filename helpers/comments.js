var md5 = require('crypto-js/md5');
    async = require('async'),
    models = require('../models');

module.exports = {
    newest: function(callbakc) {
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
        });
    }
}