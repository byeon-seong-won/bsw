# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

웹 퍼블리셔 변성원의 단일 페이지 포트폴리오 사이트. 빌드 도구는 webpack 5, 애니메이션은
GSAP + ScrollTrigger, 부드러운 스크롤은 Lenis, DOM 조작은 일부 jQuery로 처리한다.
프레임워크(React/Vue 등)는 사용하지 않는 정적 사이트다.

## 명령어

```bash
npm install          # 의존성 설치
npm run build        # 프로덕션 빌드 → docs/ 에 산출물 생성 (GitHub Pages 배포 대상)
npm run dev          # webpack-dev-server 개발 서버 (localhost:8080, HMR, 자동 오픈)
```

테스트 러너는 없다(`npm test`는 placeholder).

## 빌드 파이프라인 (중요)

`webpack.config.js`가 전체 빌드 흐름을 정의한다. 동작 방식을 정확히 이해해야 한다.

- **진입점**: `assets/js/index.js` 하나. 이 파일이 CSS / 이미지 / 라이브러리를 모두 `import`하며,
  webpack이 의존성 그래프를 따라 번들링한다.
- **출력 폴더**: `docs/` (`output.clean: true`라서 매 빌드마다 폴더를 비우고 새로 만든다).
  `docs/`는 **빌드 산출물이므로 직접 수정하지 말 것** — 소스(`assets/`, `index.html`)를 고치고 다시 빌드한다.
- **HTML**: `HtmlWebpackPlugin`이 루트의 `index.html`을 템플릿으로 받아 `docs/index.html`을 만들고,
  `<script defer src="bundle.js">`와 `styles.css <link>`를 **자동 주입**한다.
  → 템플릿(`index.html`)에 `bundle.js`나 `styles.css`를 **수동으로 넣으면 이중 로드**가 되니 넣지 않는다.
- **CSS**: `index.js`가 `import`한 CSS만 번들에 포함된다. 현재는 `layout.css`, `main.css`만 import됨.
  `MiniCssExtractPlugin`이 이를 하나의 `styles.css`로 추출한다.
  (`reset.css`, `common.css`, `fonts.css`는 다른 CSS 안에서 `@import`되거나 미사용일 수 있으니 추가 시 확인.)
- **이미지/미디어**: `file-loader`가 `png/jpg/gif/svg/webp/mp4/ico`를 `docs/assets/img/`로 복사한다.
  단, 번들에 포함되려면 `index.js` 하단의 `import '../img/...'` 목록에 등록돼 있어야 한다.
  새 이미지를 추가하면 이 목록에도 추가할 것.

### 빌드 단계별 절차

1. `assets/js/index.js`, `assets/css/*`, 루트 `index.html` 등 **소스**를 수정한다.
2. 새 이미지/미디어를 추가했다면 `index.js`의 `import '../img/...'` 목록에 등록한다.
3. `npm run build` 실행 → `docs/`가 재생성된다.
4. 개발 중 실시간 확인은 `npm run dev` 사용(소스 저장 시 자동 리로드).
5. 배포는 `docs/` 폴더를 GitHub Pages 소스로 지정(`docs/` 산출물을 커밋/푸시).

## 코드 구조

- `assets/js/index.js` — 모든 인터랙션 로직이 한 파일에 들어있다. 섹션별 주석으로 구분:
  - Lenis 스크롤 + GSAP ticker 연동
  - 커스텀 커서(`.cursor`) 및 'SEE MORE' 추종 요소(`#cursor_div`)
  - 헤더 시계(`updateTime`)
  - 인트로 스크램블 텍스트 → `wordChange` → `startIntroMotion` 시퀀스
  - 섹션별 ScrollTrigger 타임라인: `scmainAnimation` / `scfeAnimation` / `scworkAnimation`
- **반응형 처리**: `window.matchMedia(...).matches`로 분기하고 `resize` 시 위 세 함수를 재호출한다.
  데스크톱 이상에서만 hover/스크롤 애니메이션을 바인딩하고, 미만에서는 `.kill()` / `.off()`로 해제한다.
  → **resize에서 재호출되는 함수 안에서 이벤트를 바인딩할 때는 반드시 먼저 `.off()` 하거나
  타임라인 존재 여부를 가드해서 중복 바인딩을 막아야 한다**(과거 버그 원인).
- 브레이크포인트가 함수마다 다르다: sc-main `1024px`, sc-fe `1025px`, sc-work `1441px`. 의도된 차이이니 임의 통일 주의.

## 이번에 수정된 버그/품질 이슈 요약

다음 문제들을 발견·수정했다. 동일 패턴을 다시 만들지 않도록 주의:

1. **(치명) 핸들러 무한 누적** — `mousemove` 콜백 내부에서 `$('.prj-item .thumb-wrap').on(...)`을
   매 이동마다 재바인딩하던 코드를 제거. 이벤트는 네임스페이스(`.prj`)로 `off→on` 1회 바인딩으로 변경.
2. **(치명) bundle.js / styles.css 이중 로드** — 템플릿 `index.html`에 수동으로 박혀 있던
   `<script src="./bundle.js">`(defer 없음)·`<link styles.css>`를 제거. 플러그인 자동 주입에만 의존.
   (수동 태그는 defer가 없어 DOM 준비 전에 실행되어 첫 실행이 에러를 던지던 문제도 함께 해결.)
3. **(치명) 커서 ID 불일치** — JS의 `#cursor__div`(언더스코어 2개) ↔ HTML `#cursor_div`(1개) 불일치.
   HTML 기준 `#cursor_div`로 통일하고 vanilla JS로 1회만 바인딩.
4. **(치명) scroll 핸들러의 `e.pageY`** — scroll 이벤트엔 `pageY`가 없어 `NaN`이 되던 것을,
   마지막 마우스 Y(`lastMouseY`)를 보관해 사용하도록 수정.
5. **(성능) 스크롤마다 `console.log(e)`** 제거.
6. **정리** — 미사용 `SplitType` import 제거. `package.json`에 `dev` 스크립트,
   `webpack.config.js`에 `devServer` 설정 추가.

### 미해결로 남겨둔 관찰 사항 (필요 시 후속 작업)

- sc-visual의 `mainTxt` 타임라인이 인트로 `if(min-width:1024px)` 블록 안에 묶여 있어 `resize` 재평가
  대상에서 빠져 있다(sc-fe/sc-work와 비일관). 동작엔 문제없으나 구조 개선 여지.
- `package.json` `name`이 `webpack_test`, description 비어있음.
- `pretendard`, `split.js`, `split-type` 등 코드에서 미사용으로 보이는 의존성 존재(폰트는 CSS 경유).
- 이미지/동영상 원본 용량이 매우 큼(mp4 17MB 등) — webpack이 size 경고를 낸다. 최적화 여지.
