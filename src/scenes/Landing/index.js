/* eslint-disable func-names */
/* eslint-disable react/jsx-no-bind */
import React, { Suspense } from "react"
import { Canvas } from "react-three-fiber"
import * as THREE from "three"

import VoronWall from "components/VoronWall"

import "./styles.scss"

export default function Landing(props) {
  const { setLoading } = props
  let numClicks = 0

  const clicked = function() {
    numClicks++

    if (numClicks > 8) {
      document
        .getElementsByClassName("canvas-container")[0]
        .classList.add("finished")
      document
        .getElementsByClassName("logo-container")[0]
        .classList.add("finished-landing")
    }
  }

  return (
    <div className="canvas-container">
      {numClicks < 8 && (
        <Canvas
          gl={{
            outputEncoding: THREE.sRGBEncoding,
            toneMapping: THREE.ACESFilmicToneMapping
          }}
          shadowMap
          camera={{ position: [0, 6, 0], near: 0.01, far: 400 }}
          className="canvas"
          raycaster
          colorManagement
        >
          <ambientLight intensity={0.8} />
          <Suspense fallback={<></>}>
            <VoronWall clicked={clicked} setLoading={setLoading} />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
