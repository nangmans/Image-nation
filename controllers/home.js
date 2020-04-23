var sidebar = require('../helpers/sidebar');
ImageModel = require('../models').Image;
CommentModel = require('../models').Comment;

module.exports = {
    index : function(req,res) {

        var viewModel = {
            images: []
        };
      
        ImageModel.find({}, {}, {sort: { timestamp: -1 }}, //ImageModel 객체의 find 실행, 현재는 모든 image들을 나타낸다
        function(err, images) { //첫번째 인자는 filter, 두번째는 projection, 세번째는 option
            if (err) { throw err;} /*네번째 인자는 callback으로 viewmodel의 images에 
                                    find 결과로 나온 값들을 넣고 있다 */

            viewModel.images = images;

            sidebar(viewModel, function(viewModel) {  // 그 후 sidebar 실행
                res.render('index', viewModel); 
            }); 
        });
    }
};

/* 본 모듈은 이름이 index인 함수를 포함하는 객체를 포함하고 있음
index에 선언된 function 시그니처는 express를 사용하는 모든 경로에 필요함
첫번째 인자는 사용자 요청 객체(req), 두번째 인자는 응답 객체(res)이다.
 */