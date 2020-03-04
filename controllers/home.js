module.exports = {
    index : function(req,res) {
        var viewModel ={
            images: [
            {
                uniqueId: 1,
                title: 'Sample Image 1',
                description: '',
                filename: 'sample1.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            }, {
                uniqueId: 2,
                title: 'Sample Image 2',
                description: '',
                filename: 'sample2.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            }, {
                uniqueId: 3,
                title: 'Sample Image 3',
                description: '',
                filename: 'sample3.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            }, {
                uniqueId: 4,
                title: 'Sample Image 4',
                description: '',
                filename: 'sample4.jpg',
                views: 0,
                likes: 0,
                timestamp: Date.now
            }
            
        ]
    };  
    
    res.render('index', viewModel);  
    }
};

/* 본 모듈은 이름이 index인 함수를 포함하는 객체를 포함하고 있음
index에 선언된 function 시그니처는 express를 사용하는 모든 경로에 필요함
첫번째 인자는 사용자 요청 객체(req), 두번째 인자는 응답 객체(res)이다.
 */