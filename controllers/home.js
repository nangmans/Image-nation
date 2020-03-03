module.exports = {
    index : function(req,res) {
        res.send('The home: index controller');
    }
};

/* 본 모듈은 이름이 index인 함수를 포함하는 객체를 포함하고 있음
index에 선언된 function 시그니처는 express를 사용하는 모든 경로에 필요함
첫번째 인자는 사용자 요청 객체(req), 두번째 인자는 응답 객체(res)이다.
본 응답은 어떠한 요청에도 send() 내의 문자열을 보내도록 되어 있다. */