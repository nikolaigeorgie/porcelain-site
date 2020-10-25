/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from "react"

import mobile from "../Images/background_mobile.mp4"
import desktop from "../Images/background_desktop.mp4"

import "./styles.scss"

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}

export default function VideoBackground() {
  const vid_source = useRef()

  const size = useWindowSize()
  if (size.width < 800 && vid_source.current) {
    // console.log(vid_source.current)
    vid_source.current.src = mobile
  }

  console.log(size)

  return (
    <div>
      <video className="video-background" autoPlay loop playsInline muted>
        {size.width && (
          <source
            ref={vid_source}
            src={size.width < 800 ? mobile : desktop}
            type="video/mp4"
          />
        )}
      </video>
    </div>
  )
}
