import { createGlobalStyle } from "styled-components/macro"
import "typeface-roboto"
import "normalize.css"

import "./fontawesome"

export default createGlobalStyle`
  @font-face {
    font-family: 'Merit';
    src: url('merit4.ttf');
  }
  
  html, body, #root {
    height: 100%;
  }

  body {
    font-family: "Merit", Avenir, Lato, Roboto, sans-serif;
    overflow: auto;
    overflow-x: hidden;
    background: black;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
