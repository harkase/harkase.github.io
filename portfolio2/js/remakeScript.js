/* 구현할 것
1. 메인로고가 줄어들며 좌측 헤더로 이동
2. silde 클래스의 이미지 슬라이드 구현(인디케이터와 연동, 커서가 안에 있으면 멈춤)
3. clender 구획을 날짜와 연계(적어도 월과 연계)
4. radial의 움직임이후 월 날짜 사라지고 사과 이미지 등장
5. 현재 hover로 임시처리한 사과 요리 칸 이미지 유연하게 처리
6. 위로 이동 구현
 */

$(document).ready(function() {
    // ===== 슬라이드 기능 =====
    const slideWrapper = $('#slide > div');
    let slides = $('#slide > div > div');
    const indicators = $('#indicator > li');
    const originalSlideCount = slides.length;
    
    // 첫 번째 슬라이드를 복제하여 마지막에 추가
    const firstSlide = slides.eq(0).clone();
    slideWrapper.append(firstSlide);
    
    // 슬라이드 재선택 (DOM 업데이트)
    slides = $('#slide > div > div');
    
    let currentSlide = 0;
    let slideInterval;
    let isSlide = false;
    
    // 슬라이드 업데이트 함수
    function updateSlide() {
        // 상위 div를 transform으로 이동
        const translateValue = -currentSlide * 100;
        slideWrapper.css('transform', `translateX(${translateValue}%)`);
        
        // 인디케이터 업데이트
        indicators.removeClass('on');
        indicators.eq(currentSlide % originalSlideCount).addClass('on');
    }
    
    // 슬라이드 자동 진행 함수
    function autoSlide() {
        currentSlide++;
        
        // 마지막 슬라이드(복제본) 다음에 첫 슬라이드로 순환
        if (currentSlide >= originalSlideCount + 1) {
            slideWrapper.css('transition', 'none');
            currentSlide = 0;
            slideWrapper.css('transform', `translateX(${-currentSlide * 100}%)`);
            
            // 다음 프레임에서 transition 다시 활성화 후 다음 슬라이드로 진행
            setTimeout(() => {
                slideWrapper.css('transition', 'transform 0.8s ease-in-out');
                autoSlide();
            }, 50);
            return;
        }
        
        updateSlide();
    }
    
    // 슬라이드 인터벌 시작
    slideInterval = setInterval(autoSlide, 3000);
    isSlide = true;
    
    // 인디케이터 클릭 이벤트
    indicators.on('click', function() {
        currentSlide = $(this).index();
        updateSlide();
    });
    
    // 슬라이드 호버시 멈춤
    $('#slide').on('mouseenter', function() {
        if (!isSlide) return; // 이미 멈춰있으면 무시
        
        isSlide = false;
        clearInterval(slideInterval);
    });
    
    // 슬라이드 호버 해제시 재개
    $('#slide').on('mouseleave', function() {
        if (isSlide) return; // 이미 진행 중이면 무시
        
        slideInterval = setInterval(autoSlide, 3000);
        isSlide = true;
    });
    
    // 초기 슬라이드 표시
    updateSlide();
    
    // ===== 현재 월에 맞춰 캘린더 인디케이터 업데이트 =====
    const currentMonth = new Date().getMonth() + 1;
    
    // redial 클래스 내부의 ol > li에서 해당 월에 'on' 클래스 적용
    $('.redial ol li').each(function(index) {
        // li의 위치 (0부터 시작)를 월로 변환 (1월 = index 0)
        const monthNumber = index + 1;
        
        // 현재 월과 일치하면 'on' 클래스 추가, 아니면 제거
        if (monthNumber === currentMonth) {
            $(this).addClass('on');
        } else {
            $(this).removeClass('on');
        }
    });
    
    // ===== 캘린더 ul 내용을 월에 따라 표시 =====
    const calenderUlLis = $('#calender > .highlight > li');
    
    calenderUlLis.each(function(index) {
        // index 0번은 1~6월, 11~12월에 표시
        if (index === 0) {
            if ((currentMonth >= 1 && currentMonth <= 6) || (currentMonth >= 11 && currentMonth <= 12)) {
                $(this).addClass('on');
            } else {
                $(this).removeClass('on');
            }
        }
        // 나머지는 자신의 인덱스+6에 해당하는 월에 표시 (index 1 = 7월, index 2 = 8월, index 3 = 9월, index 4 = 10월)
        else {
            const displayMonth = index + 6;
            if (currentMonth === displayMonth) {
                $(this).addClass('on');
            } else {
                $(this).removeClass('on');
            }
        }
    });
});

