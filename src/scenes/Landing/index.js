/* eslint-disable func-names */
/* eslint-disable react/jsx-no-bind */
import React, { Suspense } from "react"
import { Canvas } from "react-three-fiber"
import styled from "styled-components/macro"

import VoronWall from "components/VoronWall"
import "./styles.scss"

const InfoText = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 59%;
  background: white;
  border-radius: 10px;
  color: black;
  padding: 10px;
`

export default function Landing(props) {
  const { setLoading } = props
  let numClicks = 0

  const clicked = function() {
    numClicks++

    if (numClicks > 3) {
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
          <ambientLight intensity={2} />
          <Suspense fallback={<></>}>
            <VoronWall clicked={clicked} setLoading={setLoading} />
          </Suspense>
        </Canvas>
      )}
      <InfoText>CLICK ANYWHERE</InfoText>
    </div>
  )
}
