$(document).ready(function(){
			
    var menubox = $('#section1 nav');
    var menu = menubox.find('ul li');
    var scrolls = '#section1 nav ul li a, .video a';

    //메뉴 hover, 부드러운 움직임
    menu.hover(function(){
        $(this).find('ul').stop().slideDown();
    }, function(){
        $(this).find('ul').stop().slideUp();
    });
    $(scrolls).click(function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        var target = (href == '#' || href == '') ? $('html') : $(href);
        $('html,body').animate({scrollTop:target.offset().top});
    });

    //메뉴 scroll fix
    var wHeight = $(window).height();
    var dHeight = $(document).height();
    var navHeight = menubox.outerHeight();
    var lastScrollTop = 0;
    var moveScroll;

    $(window).scroll(function(event){
        moveScroll = true;
    });

    setInterval(function(){
        if(moveScroll){
            hasScroll();
            moveScroll = false;
        }
    }, 250);
    
    function hasScroll(){
        var wScroll = $(this).scrollTop();
        if ( wScroll > lastScrollTop && wScroll > navHeight ){
                menubox.slideUp(180);
        } else {
            if( wScroll + wHeight < dHeight ) {
            menubox.slideDown(220);
            }
        }

        lastScrollTop = wScroll;
    }

    //달 회전
    var moon = $('#section1 .moon');
    var moonX = moon.offset().left + moon.outerWidth(true) / 2;
    var moonY = moon.offset().top + moon.outerHeight(true) / 2;

    $(document).on('mousemove', function(event) {
        var rad = Math.atan2(event.pageY - moonY, event.pageX - moonX);

        moon.css('transform', 'rotate('+rad+ 'rad)');
        if(event.pageX <= 830 ) {
            moon.attr('src', 'img/moon2.png');
        } else {
            moon.attr('src', 'img/moon1.png');
        }
    });

    //section6 제품 슬라이드
    var next = $('#section6 .right');
    var prev = $('#section6').find('div.left');
    var img = $('#slide ul .img');
    var count = 0;
    var imgListSize = 5;
    var maxSize = img.length;
    var slideWidth = $('#slide').width();
    var slide = $('#slide ul');

    next.click(function(){
        count < maxSize/imgListSize-1 ? count++ : count = 0;
        move();
    });
    prev.click(function(){
        if(count > 0){
            count--;
            var tl = count*slideWidth*-1;
            slide.animate({ left:tl}, 400);
        } else {
            count = maxSize/imgListSize-1;
        }
        move();	
    });
    function move () {
        var tl = count*slideWidth*-1;
        slide.animate({ left: tl}, 400);
    }


    //section8 배경 슬라이드
    let bgSlide = $('#section8 #bgslide li');
    let bgSlideBtn = $('#section8 #buttonlist li');
    let current = 0;
    let intervalId;

    bgSlideBtn.click(function(){
        var idx = $(this).index();
        if(idx != current) {
            bgSlide.eq(current).animate({left:`-100%`});
            bgSlide.eq(idx).css({left:'100%'}).animate({left:0});
            current=idx;
            bgSlideBtn.text('◇').eq(idx).text('◆')
        }
    });
    timer();
    $('#section8').hover(function(){
        clearInterval(intervalId)
    }, function(){
        timer();
    });
    function timer(){
        intervalId = setInterval(function(){
            let i = current+1;
            if (i == bgSlide.length) {i = 0}
            bgSlideBtn.eq(i).trigger('click');
        }, 3000);
    }
    
});