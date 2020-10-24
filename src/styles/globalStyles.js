import { createGlobalStyle } from "styled-components/macro"
import "typeface-roboto"
import "normalize.css"

import "./fontawesome"

export default createGlobalStyle`
  @font-face {
    font-family: 'VCR';
    src: url('VCR_OSD_MONO.ttf');
  }

  body {
    font-family: "VCR", Avenir, Lato, Roboto, sans-serif;
    overflow: auto;
    overflow-x: hidden;
    background: black;
  }
  
  @media(min-width: 800px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`
