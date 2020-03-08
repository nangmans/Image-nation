var md5 = require('crypto-js/md5'),
    fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    Models = require('../models');

module.exports = {
    index: function(req,res) {
      var viewModel = {
        image: {},
        comments: []    
      };
      
      Models.Image.findOne({ filename: { $regex: req.params.image_id }},
        function(err, image) { //findOne은 배열 대신 하나의 document만을 반환, filename이 image_id와 일치하는지 정규식으로 찾는다.
            if (err) {throw err;}
            if (image) {
                image.views = image.views + 1; // 조회수 1 증가
                viewModel.image = image; //viewModel의 image 배열에 추가
                image.save(); //mongoDB에 image 추가
              

                Models.Comment.find({ image_id: image._id }, {}, { sort: {'timestamp': 1 }},
                    function(err, comments) {
                        if (err) {throw err;}

                        viewModel.comments = comments;

                        sidebar(viewModel, function(viewModel) {
                            res.render('image', viewModel);
                        }); /* sidebar가 viewmodel을 실행하기 전에 res.render가 하는 기능(html을 렌더링)을 콜백함수로 지연시키고 있음
                        콜백함수로 지연시키지 않으면 sidebar가 작업을 끝내기 전에 res.render가 실행되어 버린다 */
                    }
                );
            } else {
                res.redirect('/'); //없는 파일명이면 이전 페이지로 리다이렉트
            }
      });       
    },
    create: function(req,res) {
        
        var saveImage = function() {
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';
                
            for(var i=0; i < 6; i+=1) {
                imgUrl += possible.charAt(Math.floor(Math.random()* possible.length));
            }

            Models.Image.find({ filename: imgUrl }, function(err,images) {
                if (images.length>0) { //반환된 images 배열의 길이(length)가 0보다 크다면 중복된 imgUrl이 있다는 것이므로,
                    saveImage();        //재귀적으로 savaImage()를 실행시켜 다시 imgUrl 생성 
                } else {
                
                var tempPath = req.files[0].path,
                    ext = path.extname(req.files[0].originalname).toLowerCase(),
                    targetPath = path.resolve('./public/upload/' + imgUrl + ext);
                      /* multer는 req.files에 파일정보를 key,value형식으로 array에 저장,
                        file의 path에 접근하기 위해 배열의 0번 값(file)의 path key에 접근한다. */
                 if (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.jpeg') {
                        fs.rename(tempPath, targetPath, function(err) {
                            if (err) throw err;

                            var newImg = new Models.Image({
                                title : req.body.title,
                                description : req.body.description,
                                filename : imgUrl + ext
                            });
                            newImg.save(function(err, image) {
                                
                                res.redirect('/images/'+imgUrl);
                            });
                            }
                        );          
                        } else {
                             fs.unlink(tempPath, (err) => {
                                if (err) throw err;
                
                                res.status(500).json('error: 이미지 형식의 파일만 업로드 할 수 있습니다.');
                             });
                        }          
                        /* png,jpg,gif 형식의 파일일 겨우 파일을 temp에서 upload 폴더로
                            6자리 숫자와 확장자를 붙여 저장한다. 그리고 /images/+이미지 이름으로
                            리다이렉트한다 */
                 }
             });
        };
        saveImage();
    },
    like: function(req,res) {
        Models.Image.findOne({ filename : {$regex: req.params.image_id }},
            function(err, image) {
                if (!err && image) { //err객체가 false이고 image객체가 true이면 if 절 true
                    image.likes = image.likes + 1;
                    image.save(function(err) {
                        if (err) {
                            res.json(err);
                        } else {
                            res.json({ likes: image.likes });
                        }
                    });
                }
            });


    },
    comment: function(req,res) {
       Models.Image.findOne({ filename : {$regex: req.params.image_id }},
        function(err, image) {
            if (!err && image) {
                
                var newComment = new Models.Comment(req.body);
               
                newComment.gravatar = md5(newComment.email);
                newComment.image_id = image._id;
                newComment.save(function(err, comment) {
                   
                    if (err) {throw err;}

                    res.redirect('/images/' + image.uniqueId + '#' + comment._id);
                });
            } else {
                res.redirect('/');
            }
        });       
    },
    remove: function(req,res) {
        Models.Image.findOne({ filename : {$regex: req.params.image_id }}, //삭제하려는 이미지 검색 수행
            function(err, image) {
                if (err) {throw err;}

                fs.unlink(path.resolve('./public/upload/' + image.filename), //연관된 이미지 삭제
                function(err) {
                    if (err) {throw err;}

                    Models.Comment.remove( {image_id : image._id}, //이미지에 달린 댓글 삭제
                    function(err) {
                        image.remove(function(err) { //이미지 자체 삭제
                            if (!err) {
                                res.json(true); //삭제가 정상적으로 완료되면 true값을 josn응답으로 보낸다
                            } else {
                                res.json(false);
                            }
                        });
                    });
                });
            });

    }
};

/* 모듈 안의 각종 함수 선언(index,create..), index의 param 프로퍼티는 
req의 body 파싱 모듈의 일부인 urlencoded 기능에 의해 request 객체에 추가되었음 */ 