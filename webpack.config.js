const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './assets/js/index.js', // JS 진입점 파일
  output: {
    filename: 'bundle.js', // 번들 파일 이름
    path: path.resolve(__dirname, 'docs'), // 출력 폴더 (docs 폴더)
    clean: true, // 이전 빌드 결과물 삭제
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // 하나로 번들링된 CSS 파일의 이름
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // CSS 파일을 처리하기 위한 규칙
        use: [
          MiniCssExtractPlugin.loader,  // CSS를 별도의 파일로 추출
          {
            loader: 'css-loader',
            options: {
              url: true, // CSS에서 url()로 참조하는 파일 경로 처리 활성화
            },
          },
        ],
      },
      {
        test: /\.(webp|mp4|ico)$/,
        use: {
          loader:"file-loader",
          options: {
            name:"[name].[ext]",
            outputPath:"assets/img",
          }
        }
      },
    ],
  },
};
