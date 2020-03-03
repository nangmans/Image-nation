module.exports = {
    index: function(req,res) {
        res.send('The image:index controller'+ req.params.image_id);
    },
    create: function(req,res) {
        res.send('The image:create POST controller');
    },
    like: function(req,res) {
        res.send('The image:like POST controller');
    },
    comment: function(req,res) {
        res.send('The image:comment POST controller');
    }
};

/* 모듈 안의 각종 함수 선언(index,create..), index의 param 프로퍼티는 
req의 body 파싱 모듈의 일부인 urlencoded 기능에 의해 request 객체에 추가되었음 */ 