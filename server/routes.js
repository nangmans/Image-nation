var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    image = require('../controllers/image');

module.exports = function(app) {
    router.get('/', home.index);
    router.get('/images/:image_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    app.use(router);
};

/* router 변수를 선언, controllers 폴더의 컨트롤러를 불러와 각각의 애플리케이션 경로에 할당
router.get과 post의 첫번째인자는 경로의 문자열 값, 두번째 인자는 콜백 함수이다 */