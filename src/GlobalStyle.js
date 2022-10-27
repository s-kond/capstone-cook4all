import { createGlobalStyle } from "styled-components";
import NotoSans from "./fonts/noto-sans-v27-latin-regular.woff";
import NotoSans2 from "./fonts/noto-sans-v27-latin-regular.woff2";
import Cookie from "./fonts/Cookie-Regular.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
//Main-font:
    font-family: 'Noto Sans';
    src:
      local('Noto Sans'), 
      url(${NotoSans2}) format('woff2'),
        url(${NotoSans}) format('woff');
//Cookie-font (for the h1-header):
    font-family: 'Cookie';
    src: 
    local("Cookie"),
    url(${Cookie}) format('truetype');
  }

  * {
    box-sizing: border-box;
    margin: 0;
    --primary-color: #dcedc1;
    --secondary-color: #FFD3B6;
  }

  body {
    --header-font: "Cookie", sans-serif;
    --main-font: 'Noto Sans', 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    font-family: var(--main-font);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
  }
`;

export default GlobalStyle;
