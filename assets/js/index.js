
// css 파일 번들링
import '../css/layout.css';
import '../css/main.css';


// js 파일 번들링
import $ from 'jquery';
import SplitType from 'split-type'
import ScrambleText from 'scramble-text';
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







  // --------------- lenis scroll --------------- 
  const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // wrapper: document.querySelector('.lenis-wrap'),
    // content: document.querySelector('.inner-lenis'),
  })
  lenis.on('scroll', (e) => {
    console.log(e)
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time)=>{
    lenis.raf(time * 600)
  })
  gsap.ticker.lagSmoothing(0)




  // --------------- cursor custom --------------- 
  let mouseCursor = document.querySelector(".cursor");
  window.addEventListener("mousemove", (e) => {
    gsap.to(mouseCursor, {
      left: e.pageX + "px",
      top: e.pageY - scrollY + "px",
    });
  });
  
  window.addEventListener("scroll", (e) => {
    gsap.to(mouseCursor, {
      top: e.pageY - scrollY + "px",
    });
  });









  // --------------- 태블릿 이상 intro ~ visual__wrap --------------- 
  if (window.matchMedia("(min-width: 1024px)").matches) {
    var spans = document.querySelectorAll('#scroll-text span');
    spans.forEach(function(span, index) {
        var currentScramble = new ScrambleText(
            span,
            {
              timeOffset: 800 + index * 70, 
              callback: function () {
                if (index === spans.length - 1)  {
                  setTimeout(()=> {
                    wordChange();
                  },500)
                }
              },
            }
        );
        currentScramble.start();
    });
    function wordChange() {
      const text = 'portfolio'; 
      const spans = document.querySelectorAll('#scroll-text span');
      
      spans.forEach((span, index) => {
        if (index < text.length) {
          setTimeout(() => {
              span.textContent = text[index];  // 한 글자씩 넣기
              if (index === spans.length - 1)  {
                document.querySelectorAll('.intro__wrap #scroll-text').forEach(function(element) {
                  element.classList.add('highlight');
                });
              }
          }, index * 170);  // 각 글자가 0.1초간격으로 들어감
        }
      });
      setTimeout(()=> {
        startIntroMotion();
      }
    ,1500)

    function startIntroMotion() {
      const introMotion = gsap.timeline({
        // scroller: '.lenis-wrap', 
      });
      introMotion
        .to('.intro__gauge-area .intro__scroll-text', {
          scale:1.3,
          autoAlpha:0
        }, 'display+=0.8')
        .to('.intro__wrap', {autoAlpha: 0})
        .from('#header', {yPercent: -100, duration:1}, "introEnd")
        .from(".visual__wrap .visual__hero-line span", 1.8,
        {
          y: 100,
          ease: "power4.out",
          skewY: 9,
          yPercent: 100,
          stagger: {
            amount: 1
          },
        }, "introEnd")
      }
  }
  gsap.to(".visual__wrap .visual__icon--desc-1", { ease:'none', duration: 2, rotate: 18, repeat: -1, yoyo: true});
  gsap.to(".visual__wrap .visual__icon--desc-2", { ease:'none', duration: 1.5, scale:1.15, repeat: -1, yoyo: true});


  





  // ---------------  태블릿 이상 visual__wrap --------------- 
  const mainTxt = gsap.timeline({
    scrollTrigger: {
      trigger: '.visual__wrap .visual__sticky-wrapper',
      start: "0% 0%",
      end: "100% 100%",
      scrub: 1,
      ease: "power4.out",
      skewY: 7,
      stagger: {
        amount: 1,
      },
      // scroller: '.lenis-wrap', 
    },
  });
  
  mainTxt
    .to('.visual__wrap .visual__content', {
      scale: 0.4,
    }, 'mainTxt')
    .to('.visual__wrap .visual__hero-line--4, .visual__wrap .visual__hero-line--3, .visual__wrap .visual__hero-line--2, .visual__wrap .visual__hero-line--1', {
      autoAlpha: 0.1,
      color: '#000',
    }, 'mainTxt')
    .to('.visual__wrap .visual__hero-line--5', {
      transform: 'translateY(-50vh)',
      autoAlpha: 1,
      scale: 1,
    })
    .to('.visual__wrap', {
      autoAlpha: 0,
    });
  }



  



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

      // main-projects__item hover 2) scramble
    //   $(".main-projects__item").each(function (index, element){
    //     if (!element.animation) {
    //       var currentScramble = new ScrambleText( 
    //         document.getElementById('tit-scr0' + (index+1)),
    //         {
    //           timeOffset: 100 + index * 10, 
    //           chars: [
    //             'A', 'B', 'C', 'D', 'E',
    //             'F', 'G', 'H', 'I', 'J',
    //             'K', 'L', 'M', 'N', 'O',
    //             'P', 'Q', 'R', 'S', 'T', 'U',
    //             'V', 'W', 'X', 'Y', 'Z'
    //           ],
    //         }
    //       );
    //       element.animation = currentScramble;
    //       element.animationStopped = false; 
    //     }
    //   });

    //   $(".main-projects__item").on('mouseenter', function () {
    //     if (!this.animationStopped) { 
    //       this.animation.start().play();
    //     }
    //   });
    //   $(".main-projects__item").on('mouseleave', function () {
    //     this.animation.stop(1);
    //     this.animationStopped = true;  
    //   });
    // } else {
    //   document.removeEventListener("mousemove", null);
    //   $(".main-projects__item .main-projects__thumb-link").off('mouseover mouseleave');
    //   $(".main-projects__item").off('mouseenter mouseleave');
    }
  }







  // -------------------- 태블릿 이상 front__wrap -------------------- 
  let scfeTimeline = null;
  function scfeAnimation() {
    if (window.matchMedia("(min-width: 1025px)").matches) {
      // front__wrap yper
      if (!scfeTimeline) {
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
        yPercent: -5,
      });
      }

      // projects-fe__item hover
      $(".projects-fe__item").each(function (index, element){
        if (!element.animation) {
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
      if (!scworkTimeline) {
        scworkTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.work__wrap',
            start: '10% 80%',
            end: '10% 10%',
            scrub: 1,
            ease: "none",
            // scroller: '.lenis-wrap', 
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
          // scroller: '.lenis-wrap', 
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
  

