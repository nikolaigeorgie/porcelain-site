/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable func-names */
import React, { Suspense } from "react"
import * as THREE from "three"
import { useThree, useLoader } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import {
  Mesh,
  MeshNormalMaterial,
  MeshLambertMaterial,
  TextureLoader
} from "three"

import bg from "../Images/Porcelain_Background.png"

export default function VoronWall(props) {
  const loader = new GLTFLoader()
  loader.setDRACOLoader(new DRACOLoader().setDecoderPath("/draco/"))

  const { scene } = useThree()

  //   const texture = useLoader(THREE.TextureLoader, bg)

  loader.load(
    "/porcelain.glb",
    function(gltf) {
      //   const bbox = new THREE.Box3().setFromObject(gltf.scene)

      gltf.scene.children[0].traverse(function(child) {
        // if (child.name === "Voronoi_Fracture") {
        if (child.children[0] && child.children[0].children.length > 2) {
          child.children.forEach(f => {
            f.rotation.set(Math.PI / 2, 0, 0)
            scene.add(f)
            console.log(f)
            f.children.forEach(m => {
              // scene.add(m)
              //   m.scale.set(0.5, 0.5, 0.5)
              m.position.z = 180
              //   scene.add(
              //     new Mesh(
              //       m.geometry,
              //       new MeshStandardMaterial({ color: [1, 0, 1] })
              //     )
              //   )
              //   m.material = new MeshLambertMaterial({
              //     map: texture
              //   })
              console.log("2")
              console.log(m)
            })
          })
        } else {
          child.children.forEach(m => {
            // console.log("3")
            // console.log(m)
            // m.material.color.r = 1
          })
        }
        // }
      })
    },
    undefined,
    function(e) {
      console.error(e)
    }
  )

  return (
    <Suspense fallback={null}>
      <mesh rotation={[Math.PI / 2, 2.2, Math.PI - 1]}>
        <boxBufferGeometry args={[3, 3, 3]} />
        <meshBasicMaterial
          attach="material"
          color="blue"
          map={new TextureLoader().load(bg)}
        />
      </mesh>
    </Suspense>
  )
}
