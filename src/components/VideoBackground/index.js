/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable camelcase */
import React from "react"

import PorcelainLoop_Desktop from "../Images/background_desktop.mp4"

import "./styles.scss"

export default function VideoBackground() {
  return (
    <video className="video-background" autoPlay loop>
      <source src={PorcelainLoop_Desktop} type="video/mp4" />
    </video>
  )
}
