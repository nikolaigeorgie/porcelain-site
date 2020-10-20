/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable func-names */
import React, { useRef, Suspense } from "react"
import * as THREE from "three"
import { useLoader, useThree, useFrame } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { draco } from "drei"

import PorcelainBG from "components/Images/Porcelain_Background.png"

export default function VoronWall(props) {
  const { clicked } = props
  const { scene } = useThree()

  const { nodes, materials } = useLoader(GLTFLoader, "/porcelain.glb")
  const texture = useLoader(THREE.TextureLoader, PorcelainBG)
  const mesh = useRef()

  nodes.RootNode.rotation.x = -Math.PI / 2
  nodes.RootNode.position.y = -200
  scene.add(nodes.RootNode)

  for (let i = 0; i < nodes.RootNode.children[0].children.length; i++) {
    if (nodes.RootNode.children[0].children[i].geometry) {
      //   console.log(nodes.RootNode.children[0].children[i].material)
      nodes.RootNode.children[0].children[i].scale.x = 1
      nodes.RootNode.children[0].children[i].material =
        nodes.RootNode.children[0].children[10].material
      //   nodes.RootNode.children[0].children[19].material = new THREE.MeshStandardMaterial({map: texture, color: "red"})
    }
  }

  document.addEventListener("click", () => {
    console.log("clicked")
    for (let i = 0; i < nodes.RootNode.children[0].children.length; i++) {
      if (nodes.RootNode.children[0].children[i].geometry) {
        // console.log(nodes.RootNode.children[0].children[i].material)
        nodes.RootNode.children[0].children[i].scale.x -= 0.05
        nodes.RootNode.children[0].children[i].scale.y -= 0.05
        nodes.RootNode.children[0].children[i].scale.z -= 0.05
        nodes.RootNode.children[0].children[i].rotation.x -=
          0.05 * (Math.random() - 0.5)
        nodes.RootNode.children[0].children[i].rotation.y -=
          0.05 * (Math.random() - 0.5)
      }
    }
    clicked()
  })

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() / 10
      mesh.current.position.y -= 0.1
    }
  })

  return <></>
}
