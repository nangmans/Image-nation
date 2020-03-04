var md5 = require('crypto-js/md5'),
    fs = require('fs'),
    path = require('path');

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
                  gravatar: md5("test@testing.com").toString(),
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

      res.render('image',viewModel);
    
    },
    create: function(req,res) {
        var saveImage = function() {
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';

            for(var i=0; i < 6; i+=1) {
                imgUrl += possible.charAt(Math.floor(Math.random()* possible.length));
            }
                console.log(req.file);
            var tempPath = req.files.file.path,
                ext = path.extname(req.files.file.name).toLowerCase(),
                targetPath = path.resolve('./public/upload/' + imgUrl + ext);

            if (ext === '.png' || ext === '.jpg' || ext === '.gif') {
                fs.rename(tempPath, targetPath, function(err) {
                    if (err) throw err;

                    res.redirect('/images/'+imgUrl);
                });          
            } else {
                fs.unlink(tempPath, function() {
                    if (err) throw err;

                    res.json(500, {error: '이미지 형식의 파일만 업로드 할 수 있습니다.'});
                });
            }
        };
        saveImage();
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