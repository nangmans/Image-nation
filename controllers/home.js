module.exports = {
    index : function(req,res) {
        res.render('index');
    }
};

/* 본 모듈은 이름이 index인 함수를 포함하는 객체를 포함하고 있음
index에 선언된 function 시그니처는 express를 사용하는 모든 경로에 필요함
첫번째 인자는 사용자 요청 객체(req), 두번째 인자는 응답 객체(res)이다.
 */