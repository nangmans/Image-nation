var home = require('../../controllers/home'),
    image = require('../../controllers/image'),
    routes = require('../../server/routes'); //test를 위해서는 routes 파일 자체도 정의해야 한다.

describe('Routes', function () {
    var app = { //기존 routes는 app을 매개변수로 받았기 때문에 test에서도 동일하게 작성
        get: sinon.spy(), //기존 routes 가 실행하는 3가지 명령을 spy로 작성
        post: sinon.spy(),
        delete: sinon.spy()
    };

    beforeEach(function () { //매 테스트를 진행하기 전에는 app을 initialize(초기화)
       
    });


    describe('GETs', function () { //routes의 get 명령에 대한 테스트

        it('should handle /', function () {
            expect(app.get).to.be.calledWith('/', function() {
                home.index
            });
        });

        it('should handle /images/:image_id', function () {
            expect(app.get).to.be.calledWith('/images/:image_id', image.index);
        });
    });

    describe('POSTs', function () { //routes의 post 명령에 대한 테스트

        it('should handle /images', function () {
            expect(app.post).to.be.calledWith('/images', image.create);
        });
        it('should handle /images/:image_id/like', function () {
            expect(app.post).to.be.calledWith('/images/:image_id/like', image.like);
        });

        it('should handle /images/:image_id/comment', function () {
            expect(app.post).to.be.calledWith('/images/:image_id/comment', image.comment);
        });
    });

    describe('DELETEs', function () { //routes의 delete 명령에 대한 테스트
        it('should handle /images/:image_id', function () {
            expect(app.delete).to.be.calledWith('/images/:image_id', image.remove);
        });
    });
});