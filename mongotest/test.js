var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/mongotest',
// 데이터베이스의 connection 개체를 사용해 'testing' 컬렉션을 새 변수에 저장
function(err, db) {
    console.log('몽고DB에 접속 성공');
    var mydb = db.db('testDB');
    //mongoDB 3.x.x 부터는 db이름을 명시해줘야 한다.("testDB")
    var collection =  mydb.collection('testing');

    //insert 함수를 사용해 컬렉션에 새로운 항목을 추가한다.
    collection.insertOne({title : "Snowcrash"}, function(err,doc) {
        // 성공적으로 입력되면 새 컬렉션의 상세 정보를 로그로 출력
        
        console.log(doc.ops.length + 'record inserted.');
        console.log(doc.ops[0].title + ' - ' + doc.ops[0]._id);
        /*testing collection은 json형식의 doc으로 지정, insert한 doc의 ops
          array에 query 결과가 들어가있다. */

        collection.findOne({
            title : "Snowcrash"
        }, function(err,doc) {
            console.log(doc._id + doc.title);
        /* findOne 함수를 통해 title이 일치하는 json을 검색, find는 ops를 통해
           접근하지 않는다 */
        
            db.close();
            //최종적으로 커넥션을 닫아준다.
        });
    }); 
});