/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable camelcase */
import React, { useEffect, useRef } from "react"

import mobile from "../Images/background_mobile.mp4"

import "./styles.scss"

export default function VideoBackground() {
  const vid_source = useRef()

  useEffect(() => {
    // console.log(vid_source)
    if (window.innerWidth < 800 && vid_source.current) {
      // console.log(vid_source.current)
      vid_source.current.src = mobile
    }
  })

  return (
    <div>
      <video className="video-background" autoPlay loop playsInline muted>
        <source
          ref={vid_source}
          src="https://d27rt3a60hh1lx.cloudfront.net/random/Porcelain_Desktop.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  )
}
