
// css 파일 번들링
import '../css/layout.css';
import '../css/main.css';


// js 파일 번들링
import $ from 'jquery';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';

// ScrollTrigger 등록
gsap.registerPlugin(ScrollTrigger);


// img 번들링
import '../img/ico-intro-1.webp';
import '../img/ico-intro-2.webp';
import '../img/blog-mo-re.webp';
import '../img/blog-pc-re.webp';
import '../img/blog-tab-re.webp';
import '../img/shop-tab-re.webp';
import '../img/shop-pc-re.webp';
import '../img/shop-mo-re.webp';
import '../img/mypage-tab-re.webp';
import '../img/mypage-pc-re.webp';
import '../img/mypage-mo-re.webp';
import '../img/chall-hv.webp';
import '../img/city-hall.webp';
import '../img/favi.ico';
import '../img/guess-hv.webp';
import '../img/guess.mp4';
import '../img/naver-hv.mp4';
import '../img/naver.mp4';
import '../img/olive-hv.mp4';
import '../img/olive-mo.webp';
import '../img/olive-mo-hv.webp';
import '../img/olive-pc.webp';
import '../img/std-hv.webp';
import '../img/std.mp4';
import '../img/banner-01.webp';
import '../img/banner-02.webp';
import '../img/banner-03.webp';
import '../img/banner-04.webp';
import '../img/banner-05.webp';
import '../img/banner-06.webp';
import '../img/banner-07.webp';
import '../img/banner-08.webp';
import '../img/event-01.webp';
import '../img/event-02.webp';
import '../img/event-03.webp';
import '../img/event-04.webp';
import '../img/event-05.webp';
import '../img/event-06.webp';
import '../img/cate-01.webp';
import '../img/cate-02.webp';
import '../img/cate-03.webp';
import '../img/cate-04.webp';
import '../img/cate-05.webp';
import '../img/freitag-01.webp';
import '../img/freitag-02.webp';
import '../img/freitag-03.webp';
import '../img/bbt-01.webp';
import '../img/bbt-02.webp';
import '../img/bbt-03.webp';
import '../img/wt-02.webp';
import '../img/wt-03.webp';
import '../img/ddu-01.webp';
import '../img/ddu-02.webp';







  // --------------- lenis scroll --------------- 
  const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time)=>{
    lenis.raf(time * 600)
  })
  gsap.ticker.lagSmoothing(0)




  // --------------- cursor custom --------------- 
  document.addEventListener("DOMContentLoaded", () => {
    let mouseCursor = document.querySelector(".cursor");
    if (mouseCursor) {
      window.addEventListener("mousemove", (e) => {
        gsap.to(mouseCursor, {
          left: e.pageX + "px",
          top: e.pageY - scrollY + "px",
        });
      });
    }
  });






  // -------------------- 태블릿 이상 main__wrap -------------------- 
  function scmainAnimation() {
    if (window.matchMedia("(min-width: 1024px)").matches) {

      // main-projects__item hover 1) cursor
      document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;
        $("#cursor_div").css('transform', 'translate(' + x + 'px, ' + y + 'px)');
        $('.main-projects__item .main-projects__thumb-link').on('mouseover', function () {
          $('.cursor__wrap').addClass('on');
          $('.cursor').css('display','none');
          document.body.style.cursor = 'none';
        });
        $('.main-projects__item .main-projects__thumb-link').on('mouseleave', function () {
          $('.cursor__wrap').removeClass('on');
          $('.cursor').css('display','block');
          document.body.style.cursor = 'default';
        });
      });
    }
  }







  // -------------------- 태블릿 이상 front__wrap -------------------- 
  let scfeTimeline = null;
  function scfeAnimation() {
    if (window.matchMedia("(min-width: 1025px)").matches) {
      // front__wrap yper
      if (document.querySelector('.front__wrap')) {
        scfeTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.front__wrap',
            start: '10% 80%',
            end: '0% 0%',
            scrub: 1,
            ease: "power4.out",
            skewY: 7,
            // scroller: '.lenis-wrap', 
          },
        });
        scfeTimeline
        .fromTo('.front__wrap .projects-fe__list', {
          yPercent: 10,
        }
      , {
        yPercent: -2,
      });
      }
      // projects-fe__item hover
      $(".projects-fe__item").each(function (index, element){
        const target = $(element).find(".projects-fe__thumb-area p");
        if (target.length > 0 && !element.animation) {  // 요소가 존재하는지 확인
          var tl = gsap.timeline({
            paused:true,
            ease: "power4.out",
            skewY: 7,
          });
          tl
          .fromTo($(element).find(".projects-fe__thumb-area p"), {
              y: '0',
            },
            {
              y: '-200',
            },'img')
            .fromTo($(element).find(".projects-fe__thumb-area .projects-fe__link-box"), {
              yPercent: -100,
            },
            {
              yPercent: 0,
            },'img')
          .fromTo($(element).find(".hover-item img"), {
            yPercent: -100,
          },
          {
            yPercent: 0,
            stagger :0.1,
          },'img')
          element.animation = tl;
        }
      });
      $(".projects-fe__item").on('mouseenter', function() {
        this.animation.play();
      });
      $(".projects-fe__item").on('mouseleave', function() {
        this.animation.reverse(0.5);
      });
    } else {
      // front__wrap yper
      if (scfeTimeline) {
        scfeTimeline.kill(); // GSAP 애니메이션 제거
        scfeTimeline = null;
      }
      // projects-fe__item hover
      $(".projects-fe__item").each(function (index, element){
        if (element.animation) {
          // 애니메이션을 초기화하고 삭제
          element.animation.kill();
          element.animation = null;
        }
      });
      $(".projects-fe__item").off('mouseenter mouseleave'); // 이벤트 리스너 비활성화
    }
  }








// -------------------- work__wrap -------------------- 
  let scworkTimeline = null;
  function scworkAnimation() {
    if (window.matchMedia("(min-width: 1441px)").matches) {

      // work__wrap yper
      if (document.querySelector('.work__wrap')) {
        scworkTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.work__wrap',
            start: '10% 80%',
            end: '10% 10%',
            scrub: 1,
            ease: "none",
          },
        });
        scworkTimeline.to('.work__wrap .work__list', {
          yPercent: -5,
        });
      }
      
      // work__item hover
      $('.work__wrap .work__item').hover(function() {
        gsap.to($(this), {
          duration: 0.5,
          xPercent: -3,
          yPercent: 2,
          ease: "linear",
        });
      }
      , function() {
        gsap.to($(this), {
          duration: 0.5,
          xPercent: 0,
          yPercent: 0,
          ease: "linear",
          // scroller: '.lenis-wrap', 
        });
      }
    );
    } else {
      // work__wrap yper
      if (scworkTimeline) {
        scworkTimeline.kill(); // GSAP 애니메이션 제거
        scworkTimeline = null;
      }
      $('.work__wrap .work__item').off('mouseenter mouseleave');
    }
  }
  scmainAnimation();
  scfeAnimation();
  scworkAnimation();

  $(window).on('resize', function() {
    scmainAnimation();
    scfeAnimation();
    scworkAnimation();
  });
  

