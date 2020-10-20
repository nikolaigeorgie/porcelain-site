import React, { useMemo, Suspense } from "react"
import { Canvas } from "react-three-fiber"
import { SpotLight } from "three"

import VoronWall from "components/VoronWall"

import "./styles.scss"

export default function Landing(props) {
  const light = useMemo(() => new SpotLight(), [])
  const lightArgs = {
    distance: 500,
    color: 0xaaaaaa,
    intensity: 5,
    angle: Math.PI / 2.4,
    penumbra: 0.5
  }

  return (
    <div className="canvas-container">
      <Canvas
        gl
        shadowMap
        camera={{ position: [0, 6, 0], near: 0.01, far: 400 }}
        className="canvas"
        raycaster
      >
        <ambientLight intensity={0.1} color={[0, 1, 1]} />
        <group position={[0, 8, 5]}>
          <primitive castShadow object={light} {...lightArgs} />
          <primitive object={light.target} position={[0, 0, 0]} />
        </group>
        <Suspense fallback={<></>}>
          <VoronWall />
        </Suspense>
      </Canvas>
    </div>
  )
}
