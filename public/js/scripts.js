$(function () {
    $('#post-comment').hide(); //post-comment ID를 가진 div 태그의 hide 함수 실행
    $('#btn-comment').on('click', function(event){ //btn-comment ID의 버튼에 이벤트 핸들러 등록
        event.preventDefault(); //클릭 시 기본동작(버튼의 기본동작)의 실행 방지
    
        $('#post-comment').show(); //post-comment ID의 태그의 show 함수 실행
     });

    $('#btn-like').on('click', function(event) { //btn-like에 onclick 이벤트 핸들러 등록
        event.preventDefault(); //기본동작 방지

        var imgId = $(this).data('id'); //like버튼으로부터 data-id 속성 반환받아 imgId에 등록

        $.post('/images/' + imgId + '/like').done(function(data) { //imgId가 포함된 경로로 post 수행
            $('.likes-count').text(data.likes); //btn-like를 likes-count로 변경 
        });
    });
});

/*Jquery는 $() 랩퍼를 사용해 익명 함수를 실행한다.
 $(document).ready의 약자, 위 코드는 페이지가 로드될 때까지 기다리다가
 콜백 함수가 실행된다는 뜻이다. 로딩 중일 때 존재하지 않는 DOM 요소에 영향을
 주는 것을 방지하기 위함 */ 