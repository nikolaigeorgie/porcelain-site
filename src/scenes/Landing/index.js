/* eslint-disable func-names */
/* eslint-disable react/jsx-no-bind */
import React, { useMemo, Suspense } from "react"
import { Canvas } from "react-three-fiber"
import { SpotLight } from "three"

import VoronWall from "components/VoronWall"

import "./styles.scss"

export default function Landing(props) {
  const { setLoading } = props
  const light = useMemo(() => new SpotLight(), [])
  const lightArgs = {
    distance: 500,
    color: 0xaaaaaa,
    intensity: 3,
    angle: Math.PI / 2.4,
    penumbra: 0.4
  }

  let numClicks = 0

  const clicked = function() {
    // console.log("parent received click")
    // console.log(numClicks)
    numClicks++

    if (numClicks > 3) {
      document.body.style.overflowY = "scroll"
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
      {numClicks < 3 && (
        <Canvas
          gl
          shadowMap
          camera={{ position: [0, 6, 0], near: 0.01, far: 400 }}
          className="canvas"
          raycaster
        >
          <group position={[0, 8, 5]}>
            <primitive castShadow object={light} {...lightArgs} />
            <primitive object={light.target} position={[0, 0, 0]} />
          </group>
          <Suspense fallback={<></>}>
            <VoronWall clicked={clicked} setLoading={setLoading} />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
