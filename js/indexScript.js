$(function() {
    $('<div>').attr('id', 'psudoback').appendTo('#container');
    $('<p>stand</p>').addClass('stand').appendTo('#psudoback');
    $('<p>dummy</p>').addClass('stand').attr('id', 'dummy').appendTo('#psudoback');

    $('#dummy').css({
        top: '100px',
        width: '1138px',
        height: '708px',
        backgroundSize: '100%'
    })
    /* 확대 효과를 위한 더미 생성 */
    /* todo1: 스크롤 이벤트
    $('<div>').
    1. 첫 화면에서 휠 진행시 
    */
    /* todo2: 이미지 클릭시 오버레이 화면
    1. 이미지 클릭하면 배경 오버레이
    2. x표시 클릭시 오버레이 닫음
    */
    /* todo3: 마지막 모니터 화면 클릭시 텍스트 출력
    1. 클릭시 모니터 텍스트 등장
    2. 텍스트는 위에서 아래 순서로 등장
    3. 내부 텍스트는 등장시 텍스트 화면이 아래 고정
    4. 텍스트의 등장시 오래된 텍스트들의 timeline 클래스 텍스트들의 내용 변경
    */
    /* todo4: 화면이 일정 width 이상인 경우 텍스트 출력 */

    /* todo5: 모니터화면에서 소개화면 간의 이동시 애니메이션  */
    const $board = $('#blackboard');
    /* 기존 이벤트 제거 */
    if (window.addEventListener) {
        window.addEventListener('wheel', function (event) {
            event.preventDefault();
        }, { passive: false });
    }
    /* 스크롤이벤트 */
    const $html = $('html');
    const $width = $( window ).width();
    const $height = $( window ).height();
    const $dummy = $('#psudoback');

    /* 스크롤 감지할 변수와 스크롤 애니메이션 */
    let page = 0;
    /* 스크롤 함수 */
    function smoothScroll(){
        let posTop = 0;
        const monitorHeight = $('.monitor').eq(1).outerHeight();
        const footer = $('footer').height();
        if(page == 0) {
            posTop = 0;
        } else if(page > 0 && page < 6) {
            posTop = monitorHeight + ((page-1) * $('#slide1').outerHeight() + 30);
        } else if(page == 6){
            posTop = $html.height() - footer - monitorHeight;
        } else {
            posTop = $html.height();
        }
        $html.animate({scrollTop : posTop});
    }
    $(window).on('wheel', function(event){
        if($html.is(":animated")) return;
        if(event.originalEvent.deltaY > 0) {
            if(page == 7) return;
            if(page == 0) zoomIn($dummy);
            if(page == 5) zoomOut($dummy);
            page++;
        } else if(event.originalEvent.deltaY < 0) {
            if(page == 0) return;
            if(page == 6) zoomIn($dummy);
            if(page == 1) zoomOut($dummy);
            page--;
        }
        /* 일정 너비 이상에서 텍스트 출력 */
        if($width > 1700){
            $board.children('p').css('display','block');
        } else {
            $board.children('p').css('display','none');
        }
        smoothScroll();
        
        /* 부드러운 스크롤 효과 */
        /*
        let posTop = 0;
        const monitorHeight = $('.monitor').eq(1).outerHeight();
        const footer = $('footer').height();
        if(page == 0) {
            posTop = 0;
        } else if(page > 0 && page < 6) {
            posTop = monitorHeight + ((page-1) * $('.slide1').outerHeight() + 30);
        } else if(page == 6){
            posTop = $html.height() - footer - monitorHeight;
        } else {
            posTop = $html.height();
        }
        $html.animate({scrollTop : posTop});
         */
    });
    $(document).on('keydown', function(event){
        if($html.is(":animated")) return;
        if(event.keyCode == 40 || event.keyCode == 34) {
            if(page == 7) return;
            if(page == 0) zoomIn($dummy);
            if(page == 5) zoomOut($dummy);
            page++;
        } else if(event.keyCode == 38 || event.keyCode == 33) {
            if(page == 0) return;
            if(page == 6) zoomIn($dummy);
            if(page == 1) zoomOut($dummy);
            page--;
        }
        if($width > 1700){
            $board.children('p').css('display','block');
        } else {
            $board.children('p').css('display','none');
        }
        smoothScroll();
    });
    
    /* 오버레이효과 */
    const $thumbnail = $('.thumbnail > a');
    const $overlay = $('#overlay');
    $thumbnail.on('click', function(event) {
        event.preventDefault();
        $overlay.children('img').attr('src',this.href).fadeIn().parent().fadeIn();
    });
    $overlay.children('button').on('click', function(){
        $overlay.fadeOut();
    });

    /* 마지막 모니터 텍스트 출력 */
    const $monitorTwo = $('.monitor > div').eq(1);
    const $chat = $('#secondplate');
    const $timeline = $('.timeline');
    let count = 0;
    let overflowTop = 0;
    $monitorTwo.one('click', function(){
        $(this).parent().children().filter('#click').fadeOut(200);
    });
    let isOn = false
    const chatTime = [0,1500,2000,2000,2000,1500,3000,1500,3000,1500]
    let timeStack = 0;
    function chatPlay() {
        if(count == 10) return;
            $chat.children().eq(count).removeClass('hidden');
            overflowTop = $chat[0].scrollHeight;
            $chat.animate({scrollTop : $chat[0].scrollHeight});
            /* 시간표시 변경 */
            for(let i = 0 ;i <= count; i++){
                $timeline.eq(i).text((count - i) + '분 전');
            }
            count++;
    };
    $monitorTwo.on('click', function() {
        /* 중복 이벤트 생성 방지 */
        if(isOn) return;
        /* 채팅 생성시 화면이동 */
        for(let i = 0; i < 10; i++){
            setTimeout(function() {
                chatPlay();
            }, timeStack += chatTime[i]);
        }
        isOn = true;
/*
const interval = setInterval(function() {
    if(count == 10) clearInterval(interval);
    $chat.children().eq(count).removeClass('hidden');
    overflowTop = $chat[0].scrollHeight;
    $chat.animate({scrollTop : $chat[0].scrollHeight});

    for(let i = 0 ;i <= count; i++){
        $timeline.eq(i).text((count - i) + '분 전');
    }
    count++;
    isOn = true;
}, 2000);
*/
    });
 
    
});
/* 애니메이션 함수 */
function zoomIn($dummy){
    $dummy.fadeIn(10).delay(10).children('#dummy').animate({
        top: '-200px',
        width: '150%',
        height: '150%',
        backgroundSize: '150%'
},500).parent().delay(510).fadeOut(100);
}
function zoomOut($dummy){
    $dummy.fadeIn(10).delay(10).children('#dummy').animate({
        top: '100px',
        width: '1138px',
        height: '708px',
        backgroundSize: '100%'
},500).parent().delay(510).fadeOut(100);
}
