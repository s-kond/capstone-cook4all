import { createGlobalStyle } from "styled-components";
import NotoSans from "./fonts/noto-sans-v27-latin-regular.woff";
import NotoSans2 from "./fonts/noto-sans-v27-latin-regular.woff2";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans';
    src: url(${NotoSans2}) format('woff2'),
        url(${NotoSans}) format('woff');
  }
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Noto Sans', 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
  }
`;

export default GlobalStyle;
