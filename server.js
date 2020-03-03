var express= require('express'),
// config = require('./server/configure'),
app = express();

//express 모듈을 선언하고 app 변수에 express를 선언한다

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname+'/views');
//app = config(app);

/*app에 port값 설정, process.env.PORT는 장비의 기본 포트, 설정되어 있지 않다면
3300 포트를 설정한다.
views의 위치를 __dirname(현재 디렉토리)+/views로 설정한다 */

app.get('/', function(req,res) {
    res.send('Hello world');
});
app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:'+app.get('port'));
});

/* 어떤 요청이든 애플리케이션으로 요청을 보내면('/'), Hello world로 응답
하게 한다.
앱의 listen()함수를 호출해 어떤 포트로 응답을 받을지 알려주고(app.get('port'))
서버가 구동되면 적절한 문장을 출력하는 익명 함수를 콜백으로 넘겨준다. */