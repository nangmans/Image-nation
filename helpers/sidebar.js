var Stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments'),
    async = require('async'); 

module.exports = function(viewModel, callback) { //sidebar가 이제 비동기적인 헬퍼 모듈을 사용하므로 이를 처리하기 위한 비동기적 처리를 해야 한다.
    async.parallel([ //async의 parallel 함수는 연속된 함수들을 동시에 실행한다. async.parallel([callbacks]<-괄호 중요,callback(err,results)) 형식으로 쓴다
        function(next) { // 배열의 모든 함수는 next 콜백 함수를 인자로 받아들이는데, 이는 함수 실행 후 실행되는 함수이다.
            Stats(next); //비동기x 즉각적으로 데이터 반환
        },
        function(next) {
            Images.popular(next); //비동기x 즉각적으로 데이터 반환
        },
        function(next) { //next콜백을 인자로 넘김으로서 실행을 newest가 다 수행될 때까지 연기하고 next 콜백이 호출되는 순간 작업한 것을 넘긴다.
            Comments.newest(next);
        }
    ], function(err, results) { 
        viewModel.sidebar = { //위의 함수들이 실행한 결과를 담고 있는 배열 각 result들은 위에서 명시된 순서와 같다.
            stats: results[0],
            popular: results[1],
            comments: results[2] //results가 [2]이 아닌 function으로 접근해야 옳은 결과가 나옴. 왜?? -> 수행 function을 []가 아닌 {}로 묶음
        };       
        
        callback(viewModel);
        
   
    });
};