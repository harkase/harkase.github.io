/* 구현할 것
    1. 오버레이 메뉴
    2. 휠 올라간 이후에 텀을 둬서 올라오는 기능
    (aos에 있는 기능 참조)
    3. 중간 화면에 있는 효과가 구현된후 fadeOut
    (스크롤이 다시 올라갈때도 고려)
 */
$(function() {
    /* 중간효과를 위한 태그와 스타일생성 */
    $('<div>').attr('id', 'effect').append('<div>').insertBefore('section');
    $('#effect > div').append('<div>upper sheet</div>').append('<img>')
    .append('<div>under sheet</div>');
    $('#effect').children('img').css("left", "-100px").parent()
    .children('div').eq(0).css('top', '0vh').parent()
    .children('div').eq(1).css('top', '50vh');


    const $window = $(window);
    const $effect = $('#effect > div');
    const $wrap = $('#wrap');
    const $product = $('#product');
    const $commission = $('#commission');
    const processTop = $('#process').offset().top;
    let isProcessOn = false;
    let isProductOn = false;
    let isCommissionOn = false;
    let effectToggle = true;
    let effectRunning = false;
    const halfHeight = window.innerHeight * 0.5;
    let scrollpast = 0;
    /* 중간 이팩트*/
    $window.on('scroll', function() {
        if(effectRunning) return;
        let scrollNow = $window.scrollTop();
        if(scrollNow >= ($('#mainview').innerHeight()) - 300 && effectToggle){
            if(!effectRunning && scrollNow > scrollpast) {
                effectRunning = true;
                $effect.children('img').animate({
                    left: $effect.width() - 200 + 'px'
                }, 600);
                setTimeout(function() {
                    $effect.children().eq(0).animate({top: '-50vh'}, 400).
                    parent().children().eq(2).animate({top: '100vh'}, 400);
                }, 600);
                setTimeout(function() {$effect.fadeOut(200); }, 1000);
                setTimeout(function() {
                    effectRunning = false; 
                    effectToggle = false;
                }, 1200);
            }
        }
        if(scrollNow < (processTop - halfHeight) && !effectToggle){
            if(!effectRunning && scrollNow < scrollpast){
                effectRunning = true;
                $effect.fadeIn(200);
                setTimeout(function() {
                    $effect.children().eq(0).animate({top: '0vh'}, 400).
                    parent().children().eq(2).animate({top: '50vh'}, 400);
                },200);
                setTimeout(function() {
                    $effect.children('img').animate({left:'-100px'}, 600);
                },600)
                setTimeout(function() {
                    effectRunning = false; 
                    effectToggle = true;
                }, 1200);
            }
        }
        /*
        if(scrollNow >= ($('#mainview').innerHeight()) - 300 && scrollNow < (processTop - halfHeight)){
            if(effectToggle && scrollNow > scrollpast){
                effectRunning = true;
                $effect.children('img').animate({
                    left: $effect.width() - 200 + 'px'
                }, 600);
                setTimeout(function() {
                    $effect.children().eq(0).animate({top: '-50vh'}, 400).
                    parent().children().eq(2).animate({top: '100vh'}, 400);
                }, 600);
                setTimeout(function() {$effect.fadeOut(200); }, 1000);
                setTimeout(function() {
                    effectRunning = false; 
                    effectToggle = false;
                }, 1200);
            } else if(!effectToggle && scrollNow < scrollpast){
                effectRunning = true;
                $effect.fadeIn(200);
                setTimeout(function() {
                    $effect.children().eq(0).animate({top: '0vh'}, 400).
                    parent().children().eq(2).animate({top: '50vh'}, 400);
                },200);
                setTimeout(function() {
                    $effect.children('img').animate({left:'-100px'}, 600);
                },600)
                setTimeout(function() {
                    effectRunning = false; 
                    effectToggle = true;
                }, 1200);
            }
        }
         */
        scrollpast = scrollNow;
    });
    /* aos 모방 기능 */
    $window.on('scroll', function() {
        let scrollNow = $window.scrollTop();    
        if(scrollNow >= (processTop - halfHeight) && !isProcessOn) {
            $wrap.children('.popup').each(function (index, item) {
                $(item).addClass('on').css("transitionDelay", index * 300 + "ms");
            });
            isProcessOn = true;
        };
        if(scrollNow >= ($product.offset().top - halfHeight) && !isProductOn) {
            $product.children('.popup').each(function (index, item) {
                $(item).addClass('on').css("transitionDelay", index * 300 + "ms");
            });
            isProductOn = true;
        };
        if(scrollNow >= ($commission.offset().top - halfHeight) && !isCommissionOn) {
            $commission.children('.popup').each(function (index, item) {
                $(item).addClass('on').css("transitionDelay", index * 300 + "ms");
            });
            isCommissionOn = true;
        } else return
        
    });

    /* 클릭시 맨위로 이동 */
    const $header = $('header');
    const $TopArrow = $('#topArrow');

    $TopArrow.on('click', function() {
        $header.removeClass('up');
        $effect.children('img').css({left:'-100px'});
        $effect.children().eq(0).css({top: '0vh'}).
        parent().children().eq(2).css({top: '50vh'});
        $('html').animate({scrollTop : 0});
        scrollpast = 0;
    });

});