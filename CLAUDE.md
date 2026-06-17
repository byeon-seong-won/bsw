# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

웹 퍼블리셔 변성원의 단일 페이지 포트폴리오 사이트. 빌드 도구는 webpack 5, 애니메이션은
GSAP + ScrollTrigger, 부드러운 스크롤은 Lenis, 일부 DOM 조작은 jQuery로 처리한다.
프레임워크(React/Vue 등)는 사용하지 않는 정적 사이트이며, Google Analytics(gtag)가 붙어 있다.
CSS 클래스는 BEM 네이밍(`block__element--modifier`)을 따른다.

> 참고: 이 저장소는 `main` 과 `master` 두 갈래로 분기되어 있다. `master` 가 더 발전된(BEM 리팩토링,
> webp 이미지, gtag 적용) 버전이다. 두 브랜치 모두 origin 에 올라가 있으니 작업 대상 브랜치를 먼저 확인할 것.

## 명령어

```bash
npm install          # 의존성 설치
npm run build        # 프로덕션 빌드 → docs/ 에 산출물 생성 (GitHub Pages 배포 대상)
npm run dev          # webpack-dev-server 개발 서버 (localhost:8080, HMR, 자동 오픈)
```

테스트 러너는 없다(`npm test`는 placeholder).

## 빌드 파이프라인 (중요)

`webpack.config.js`가 전체 빌드 흐름을 정의한다.

- **진입점**: `assets/js/index.js` 하나. 이 파일이 CSS / 이미지 / 라이브러리를 모두 `import`하며,
  webpack이 의존성 그래프를 따라 번들링한다.
- **출력 폴더**: `docs/` (`output.clean: true`라 매 빌드마다 비우고 새로 만든다).
  `docs/`는 **빌드 산출물이므로 직접 수정하지 말 것** — 소스(`assets/`, `index.html`)를 고치고 다시 빌드한다.
- **HTML**: `HtmlWebpackPlugin`이 루트 `index.html`을 템플릿으로 `docs/index.html`을 만들면서
  `<script defer src="bundle.js">`와 `styles.css <link>`를 **자동 주입**한다.
  → 템플릿(`index.html`)에 `bundle.js`나 `styles.css`를 **수동으로 넣으면 이중 로드**가 되니 넣지 않는다.
  (gtag 스크립트와 폰트 `<link>`는 템플릿에 직접 둔다.)
- **CSS**: `index.js`가 `import`한 CSS만 번들에 포함된다(현재 `layout.css`, `main.css`).
  `MiniCssExtractPlugin`이 하나의 `styles.css`로 추출한다.
- **이미지/미디어**: `file-loader`가 `webp / mp4 / ico`를 `docs/assets/img/`로 복사한다.
  단, **`index.js` 하단의 `import '../img/...'` 목록에 등록돼 있어야** 번들에 포함된다.
  새 이미지를 추가하면 이 목록에도 반드시 추가할 것(이미지는 webp 사용).

### 빌드/배포 단계

1. `assets/js/index.js`, `assets/css/*`, 루트 `index.html` 등 **소스**를 수정한다.
2. 새 이미지/미디어를 추가했다면 `index.js`의 `import '../img/...'` 목록에 등록한다.
3. `npm run build` 실행 → `docs/`가 재생성된다.
4. 개발 중 실시간 확인은 `npm run dev`.
5. 배포는 `docs/` 산출물까지 함께 커밋/푸시(GitHub Pages 소스가 `docs/`).

## 코드 구조

- `assets/js/index.js` — 모든 인터랙션 로직이 한 파일에 들어있다(섹션별 주석으로 구분):
  Lenis 스크롤 + GSAP ticker 연동 / 커스텀 커서(`.cursor`)와 'SEE MORE' 추종 요소(`#cursor_div`) /
  `scmainAnimation`(데스크톱 hover 효과).
- **반응형**: `window.matchMedia(...).matches`로 분기하고 `resize` 시 `scmainAnimation`을 재호출한다.
  → **resize에서 재호출되는 함수 안에서 이벤트를 바인딩할 때는 반드시 네임스페이스로 `off→on`** 하여
  중복 바인딩을 막아야 한다(과거 핸들러 무한 누적 버그의 원인). 커서 추종 mousemove 리스너는 함수 밖에서 1회만 등록한다.

## 정리된 버그/품질 이슈 (동일 패턴 재발 주의)

1. **(치명) 핸들러 무한 누적** — `mousemove` 콜백 안에서 hover 핸들러를 매번 재바인딩하던 코드를
   네임스페이스(`.prj`) `off→on` 1회 바인딩으로 변경. 커서 추종 리스너는 함수 밖 1회 등록으로 분리.
2. **(치명) bundle.js / styles.css 이중 로드** — 템플릿의 수동 `<script>`/`<link>` 제거,
   플러그인 자동 주입에만 의존(수동 태그는 defer가 없어 DOM 준비 전 실행되던 문제도 함께 해결).
3. **빌드 설정** — `package.json`에 `dev` 스크립트, `webpack.config.js`에 `devServer` 추가,
   `build`에 `--mode production` 명시.
4. WORKS 연도 표기 갱신.

### 관찰 사항 (후속 여지)

- `package.json` `name`이 `webpack_test`, description 비어있음.
- `pretendard`, `split.js`, `split-type`, `scramble-text` 등 현재 코드에서 미사용으로 보이는 의존성 존재.
- 동영상/이미지 원본 용량이 커서 webpack이 size 경고를 낸다(최적화 여지).
