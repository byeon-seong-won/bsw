
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






  // --------------- 'SEE MORE' 커서 추종 요소 (#cursor_div) ---------------
  // 리스너는 단 한 번만 등록 (resize/mousemove 중복 바인딩 방지)
  const cursorDiv = document.querySelector("#cursor_div");
  if (cursorDiv) {
    window.addEventListener("mousemove", (e) => {
      cursorDiv.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }

  // -------------------- 태블릿 이상 main__wrap --------------------
  function scmainAnimation() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      // 네임스페이스 이벤트로 항상 off 후 on → resize 시에도 중복 바인딩되지 않음
      $('.main-projects__item .main-projects__thumb-link')
        .off('mouseover.prj mouseleave.prj')
        .on('mouseover.prj', function () {
          $('.cursor__wrap').addClass('on');
          $('.cursor').css('display', 'none');
          document.body.style.cursor = 'none';
        })
        .on('mouseleave.prj', function () {
          $('.cursor__wrap').removeClass('on');
          $('.cursor').css('display', 'block');
          document.body.style.cursor = 'default';
        });
    } else {
      // 데스크톱 미만: hover 핸들러 해제
      $('.main-projects__item .main-projects__thumb-link').off('mouseover.prj mouseleave.prj');
    }
  }




  $(window).on('resize', function() {
    scmainAnimation();
  });
  scmainAnimation();
  

