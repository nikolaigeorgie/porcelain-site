import React from "react"
// import { ShopifyContext } from "services/shopify"
import { Canvas } from "react-three-fiber"
import * as THREE from "three"

import Egg from "components/Egg"

import "./styles.scss"

export default function Landing(props) {
  return (
    <div className="container">
      <Canvas
        shadowMap
        camera={{ position: [0, 6, 0], near: 0.01, far: 200 }}
        className="canvas"
      >
        <ambientLight intensity={0.2} color={[0, 1, 1]} />
        <mesh rotation={[Math.PI / 2, 2.2, Math.PI - 1]}>
          <boxBufferGeometry args={[3, 3, 3]} attach="geometry" />
          <meshNormalMaterial attach="material" />
        </mesh>
        <Egg />
      </Canvas>
    </div>
  )
}
