$(function() {
    /* 오버레이 메뉴 등장 */
    const $menu = $('#menu');
    const $overlay = $('#overlay');
    $menu.on('click', function() {
        $overlay.removeClass('hidden').animate({left : '0'}, 300)
        setTimeout(function() {
            $overlay.children().addClass('on')
        }, 500);
    });
    $overlay.find('#close').on('click', function(){
        $overlay.children().removeClass('on').parent()
        .delay(300).animate({left : '100%'}, 300);
        setTimeout(function() {
            $overlay.addClass('hidden')
        }, 600);
    });

    const $window = $(window);
    const $nav = $('#navigationBar > li');
    /* 크기별 헤더 조정 */
    if($window.width() < 1500) {
        $nav.addClass('hidden')
    } else {
        $nav.removeClass('hidden')
    };
    $window.on('resize', function() {
        if($window.width() < 1500) {
            $nav.addClass('hidden')
        } else {
            $nav.removeClass('hidden')
        };
    });

    /* 키보드와 마우스 휠 작동시 헤더 움직임 */
    const $header = $('header');
    let isHeaderMove = false;
    $window.on('wheel', function(event) {
        if (isHeaderMove) return;
        if (event.originalEvent.deltaY > 0) {
            isHeaderMove = true;
            $header.addClass('up');
            setTimeout(function() {
                isHeaderMove = false;
            },500);
        } else if (event.originalEvent.deltaY < 0){
            isHeaderMove = true;
            $header.removeClass('up');
            setTimeout(function() {
                isHeaderMove = false;
            },500);
        };
    });
    $(document).on('keydown', function(event){
        if(isHeaderMove) return;
        if (event.keyCode == 40 || event.keyCode == 34) {
            isHeaderMove = true;
            $header.addClass('up');
            setTimeout(function() {
                isHeaderMove = false;
            },500);
        } else if (event.keyCode == 38 || event.keyCode == 33){
            isHeaderMove = true;
            $header.removeClass('up');
            setTimeout(function() {
                isHeaderMove = false;
            },500);
        };
    });
});