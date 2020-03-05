var md5 = require('crypto-js/md5'),
    fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar');
module.exports = {
    index: function(req,res) {
        
      var viewModel = {
          image: {
              uniqueId: 1,
              title: 'sample Image1',
              description: 'This is a sample',
              filename: 'sample1.jpg',
              views: 0,
              likes: 0,
              timestamp: Date.now()
          },
          comments: [
              {
                  image_id: 1,
                  email: 'test@testing.com',
                  name: 'Test Tester',
                  gravatar: md5('test@testing.com').toString(),
                  comment: 'This is a test comment..',
                  timestamp: Date.now()
              }, {
                 image_id: 1,
                 email: 'test@testing.com',
                 name: 'Test Tester',
                 gravatar: md5("test@testing.com").toString(),
                 comment: 'Another followup comment..',
                 timestamp: Date.now()
              }
          ]    
      };

      sidebar(viewModel, function(viewModel){ 
        res.render('image', viewModel); 
       }); 
       /* sidebar가 viewmodel을 실행하기 전에 res.render가 하는 기능(html을 렌더링)을 콜백함수로 지연시키고 있음
          콜백함수로 지연시키지 않으면 sidebar가 작업을 끝내기 전에 res.render가 실행되어 버린다 */
    
    },
    create: function(req,res) {
        
        var saveImage = function() {
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';
                
            for(var i=0; i < 6; i+=1) {
                imgUrl += possible.charAt(Math.floor(Math.random()* possible.length));
            }
            var tempPath = req.files[0].path,
                ext = path.extname(req.files[0].originalname).toLowerCase(),
                targetPath = path.resolve('./public/upload/' + imgUrl + ext);
            /* multer는 req.files에 파일정보를 key,value형식으로 array에 저장,
               file의 path에 접근하기 위해 배열의 0번 값(file)의 path key에 접근한다. */
            if (ext === '.png' || ext === '.jpg' || ext === '.gif') {
                fs.rename(tempPath, targetPath, function(err) {
                    if (err) throw err;

                    res.redirect('/images/'+imgUrl);
                });          
            } else {
                fs.unlink(tempPath, (err) => {
                    if (err) throw err;
                
                    res.json(500, 'error: 이미지 형식의 파일만 업로드 할 수 있습니다.');
                });
            }          
        };
        /* png,jpg,gif 형식의 파일일 겨우 파일을 temp에서 upload 폴더로
                   6자리 숫자와 확장자를 붙여 저장한다. 그리고 /images/+이미지 이름으로
                   리다이렉트한다 */
        saveImage();
    },
    like: function(req,res) {
        res.json({likes: 1});
    },
    comment: function(req,res) {
        res.send('The image:comment POST controller');
    }
};

/* 모듈 안의 각종 함수 선언(index,create..), index의 param 프로퍼티는 
req의 body 파싱 모듈의 일부인 urlencoded 기능에 의해 request 객체에 추가되었음 */ 