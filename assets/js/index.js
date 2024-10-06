
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
import '../img/ico-intro-1.png';
import '../img/ico-intro-2.png';
import '../img/blog-mo-re.jpg';
import '../img/blog-pc-re.jpg';
import '../img/blog-tab-re.jpg';
import '../img/shop-tab-re.jpg';
import '../img/shop-pc-re.jpg';
import '../img/shop-mo-re.jpg';
import '../img/mypage-tab-re.jpg';
import '../img/mypage-pc-re.jpg';
import '../img/mypage-mo-re.jpg';
import '../img/chall-hv.jpg';
import '../img/city-hall.jpg';
import '../img/favi.ico';
import '../img/guess-hv.png';
import '../img/guess.mp4';
import '../img/naver-hv.gif';
import '../img/naver.mp4';
import '../img/olive-hv.mp4';
import '../img/olive-mo.jpg';
import '../img/olive-mo-hv.jpg';
import '../img/olive-pc.jpg';
import '../img/std-hv.png';
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




  // --------------- header time --------------- 
  // function updateTime() {
  //   var today = new Date();   
  //   var hours = ('0' + today.getHours()).slice(-2); 
  //   var minutes = ('0' + today.getMinutes()).slice(-2);
  //   var seconds = ('0' + today.getSeconds()).slice(-2); 
  //   var timeString = hours + ':' + minutes  + ':' + seconds;
  //   document.getElementById("time").innerHTML = timeString;
  // }
  // setInterval(updateTime, 1000);
  // updateTime();

  // document.addEventListener("DOMContentLoaded", function() {
  //   setInterval(updateTime, 1000);
  //   updateTime();
  // });



  // --------------- 태블릿 이상 intro ~ sc-visual --------------- 
  if (window.matchMedia("(min-width: 1024px)").matches) {
    var spans = document.querySelectorAll('#sct span');
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
      const spans = document.querySelectorAll('#sct span');
      
      spans.forEach((span, index) => {
        if (index < text.length) {
          setTimeout(() => {
              span.textContent = text[index];  // 한 글자씩 넣기
              if (index === spans.length - 1)  {
                document.querySelectorAll('.intro #sct').forEach(function(element) {
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
        .to('.guage-area p', {
          scale:1.3,
          autoAlpha:0
        }, 'display+=0.8')
        .to('.intro', {autoAlpha: 0})
        .from('#header', {yPercent: -100, duration:1}, "introEnd")
        .from(".sc-visual .hero-line span", 1.8,
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
  gsap.to(".sc-visual .ico-desc-01", { ease:'none', duration: 2, rotate: 18, repeat: -1, yoyo: true});
  gsap.to(".sc-visual .ico-desc-02", { ease:'none', duration: 1.5, scale:1.15, repeat: -1, yoyo: true});


  





  // ---------------  태블릿 이상 sc-visual --------------- 
  const mainTxt = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-visual .sticky-wrapper',
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
    .to('.sc-visual .main-cont', {
      scale: 0.4,
    }, 'mainTxt')
    .to('.sc-visual .hero-line-4, .sc-visual .hero-line-3, .sc-visual .hero-line-2, .sc-visual .hero-line-1', {
      autoAlpha: 0.1,
      color: '#000',
    }, 'mainTxt')
    .to('.sc-visual .hero-line-5', {
      transform: 'translateY(-50vh)',
      autoAlpha: 1,
      scale: 1,
    })
    .to('.sc-visual', {
      autoAlpha: 0,
    });
  }



  



  // -------------------- 태블릿 이상 sc-main -------------------- 
  function scmainAnimation() {
    if (window.matchMedia("(min-width: 1024px)").matches) {

      // prj-item hover 1) cursor
      document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;
        $("#cursor__div").css('transform', 'translate(' + x + 'px, ' + y + 'px)');
        $('.prj-item .thumb-wrap').on('mouseover', function () {
          $('.inner_wrap').addClass('on');
          $('.cursor').css('display','none');
          document.body.style.cursor = 'none';
        });
        $('.prj-item .thumb-wrap').on('mouseleave', function () {
          $('.inner_wrap').removeClass('on');
          $('.cursor').css('display','block');
          document.body.style.cursor = 'default';
        });
      });

      // prj-item hover 2) scramble
    //   $(".prj-item").each(function (index, element){
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

    //   $(".prj-item").on('mouseenter', function () {
    //     if (!this.animationStopped) { 
    //       this.animation.start().play();
    //     }
    //   });
    //   $(".prj-item").on('mouseleave', function () {
    //     this.animation.stop(1);
    //     this.animationStopped = true;  
    //   });
    // } else {
    //   document.removeEventListener("mousemove", null);
    //   $(".prj-item .thumb-wrap").off('mouseover mouseleave');
    //   $(".prj-item").off('mouseenter mouseleave');
    }
  }







  // -------------------- 태블릿 이상 sc-fe -------------------- 
  let scfeTimeline = null;
  function scfeAnimation() {
    if (window.matchMedia("(min-width: 1025px)").matches) {
      // sc-fe yper
      if (!scfeTimeline) {
        scfeTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.sc-fe',
            start: '10% 80%',
            end: '0% 0%',
            scrub: 1,
            ease: "power4.out",
            skewY: 7,
            // scroller: '.lenis-wrap', 
          },
        });
        scfeTimeline
        .fromTo('.sc-fe .fe-list', {
          yPercent: 10,
        }
      , {
        yPercent: -5,
      });
      }

      // fe-item hover
      $(".fe-item").each(function (index, element){
        if (!element.animation) {
          var tl = gsap.timeline({
            paused:true,
            ease: "power4.out",
            skewY: 7,
          });
          tl
          .fromTo($(element).find(".thumb-area p"), {
              y: '0',
            },
            {
              y: '-200',
            },'img')
            .fromTo($(element).find(".thumb-area .link-box"), {
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
      $(".fe-item").on('mouseenter', function() {
        this.animation.play();
      });
      $(".fe-item").on('mouseleave', function() {
        this.animation.reverse(0.5);
      });
    } else {
      // sc-fe yper
      if (scfeTimeline) {
        scfeTimeline.kill(); // GSAP 애니메이션 제거
        scfeTimeline = null;
      }
      // fe-item hover
      $(".fe-item").each(function (index, element){
        if (element.animation) {
          // 애니메이션을 초기화하고 삭제
          element.animation.kill();
          element.animation = null;
        }
      });
      $(".fe-item").off('mouseenter mouseleave'); // 이벤트 리스너 비활성화
    }
  }








// -------------------- sc-work -------------------- 
  let scworkTimeline = null;
  function scworkAnimation() {
    if (window.matchMedia("(min-width: 1441px)").matches) {

      // sc-work yper
      if (!scworkTimeline) {
        scworkTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.sc-work',
            start: '10% 80%',
            end: '10% 10%',
            scrub: 1,
            ease: "none",
            // scroller: '.lenis-wrap', 
          },
        });
        scworkTimeline.to('.sc-work .work-list', {
          yPercent: -5,
        });
      }
      
      // work-item hover
      $('.sc-work .work-item').hover(function() {
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
      // sc-work yper
      if (scworkTimeline) {
        scworkTimeline.kill(); // GSAP 애니메이션 제거
        scworkTimeline = null;
      }
      $('.sc-work .work-item').off('mouseenter mouseleave');
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
  

