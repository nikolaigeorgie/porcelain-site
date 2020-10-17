import React, { useMemo } from "react"
import { Canvas } from "react-three-fiber"
import { SpotLight } from "three"

import VoronWall from "components/VoronWall"

import "./styles.scss"

export default function Landing(props) {
  const light = useMemo(() => new SpotLight(), [])
  const lightArgs = {
    distance: 500,
    color: 0x57a4a9,
    intensity: 5,
    angle: Math.PI / 2.4,
    penumbra: 0.5
  }

  return (
    <div className="canvas-container">
      <Canvas
        shadowMap
        camera={{ position: [0, 6, 0], near: 0.01, far: 200 }}
        className="canvas"
      >
        <ambientLight intensity={0.4} color={[0, 1, 1]} />
        <group position={[-4, 8, 5]}>
          <primitive castShadow object={light} {...lightArgs} />
          <primitive object={light.target} position={[-1, -1, -1]} />\{" "}
        </group>
        <mesh rotation={[Math.PI / 2, 2.2, Math.PI - 1]}>
          <boxBufferGeometry args={[3, 3, 3]} attach="geometry" />
          <meshStandardMaterial attach="material" color="blue" />
        </mesh>
        <VoronWall />
      </Canvas>
    </div>
  )
}
