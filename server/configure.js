var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),//뷰를 위해 사용할 템플릿 엔진
    express = require('express'),
    bodyParser = require('body-parser'), //connect 미들웨어의 HTML데이터 해석 모듈
    cookieParser = require('cookie-parser'), //connect의 쿠키 담당 모듈
    morgan = require('morgan'), //connect 미들웨어의 로깅을 담당하는 모듈
    methodOverride = require('method-override'), //connect의 http메소드 흉내 모듈
    errorHandler = require('errorhandler'); //connect의 에러 처리 모듈
    moment = require('moment');

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser({
        uploadDir:path.join(__dirname, 'public/upload/temp')
    }));
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app); //경로들을 routes 파일로 이동, 서버에서 라우터를 사용 가능하게 해줌
    app.use('/public/', express.static(path.join(__dirname,'../public'))); /* express.static은 미리 정의된
    디렉토리의 정적 자원을 브라우저에 그려야 할 때 사용한다. 여기서는 public 내에 있는 파일을 제공하게 해준다 
    app.router() 뒤에 정의해야 한다 */

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function(timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine); /* engine 함수를 사용해 렌더링 엔진을 정의함
    engine함수의 첫번째 객체는 엔진이 찾아야 하는 파일의 확장자, 두번째 인자는 create함수를 사용해 
    렌더링 엔진을 구성한다. */
    app.set('view engine', 'handlebars'); 

    return app;
    
};

//configure 모듈에서 사용할 각 모듈을 위한 변수 정의 및 내보내보자 하는 모듈 정의
