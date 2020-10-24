/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable camelcase */
import React from "react"
import styled from "styled-components/macro"

import "./styles.scss"

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgb(35 0 68 / 80%));
  width: 100vw;
  height: 100vh;
  z-index: -1;
`

export default function VideoBackground() {
  return (
    <div>
      <Overlay />
      <video className="video-background" autoPlay loop playsInline muted>
        <source
          src="https://d27rt3a60hh1lx.cloudfront.net/random/Porcelain_Desktop.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  )
}
