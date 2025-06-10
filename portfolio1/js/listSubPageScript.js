/* 구현할 것
    1. 오버레이 메뉴
    2. 휠 올라간 이후에 텀을 둬서 올라오는 기능
    (aos에 있는 기능 참조)
    3. 마우스 호버시 이미지 슬라이드
 */
$(function() {
    /* aos 모방 */
    const $window = $(window);
    const $content = $('#wrap > div')
    $content.each(function () {
        $(this).addClass('popup');
    });
    const offsetHeight = window.innerHeight - ($('.slide').height() * 0.5);
    $window.on('scroll', function() {
        let scrollNow = $window.scrollTop();
        for(let i = 0; i < 10; i++){
            if(scrollNow >= $content.eq(i).offset().top - offsetHeight) {
                $content.eq(i).addClass('on');
            }
        }
    });

    /* 슬라이드 */
    const INTERVAL = 2000;
    const $slide = $('.slide')
    let timerArray = new Array();

    $content.each(function (index, item) {
        if($(item).hasClass('isNotSlide')) return;
        else {
            $(item).on({
                mouseenter: function() {
                    timerArray[index] = window.setInterval(slideImg, INTERVAL, index);
                    console.log("mouseevent on");
                },
                mouseleave: function() {
                    window.clearInterval(timerArray[index]);
                    console.log("mouseevent off");
                }
            });
        }
    });
        /* 클릭시 맨위로 이동 */
    const $TopArrow = $('#topArrow');

    $TopArrow.on('click', function() {
        $('html').animate({scrollTop : 0});
        $('header').removeClass('up');
    });
});

function slideImg(index) {
    $('.slide').eq(index).children().animate({marginLeft: '-100%'}, function () {
        $('.slide').eq(index).children().removeAttr('style').children(':first').appendTo(this);
    });
}
