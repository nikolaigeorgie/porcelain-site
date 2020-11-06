/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable func-names */
import React, { useEffect } from "react"
import { useLoader, useFrame, useThree } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { draco } from "drei"

export default function VoronWall(props) {
  const { clicked, setLoading } = props
  const { scene, raycaster } = useThree()

  const { nodes } = useLoader(GLTFLoader, "/porcelain2.glb")

  let mesh

  nodes[Object.keys(nodes)[0]].parent.rotation.x = -Math.PI / 2

  for (let i = 0; i < Object.keys(nodes).length; i++) {
    mesh = nodes[Object.keys(nodes)[i]]
    scene.add(mesh)
    window.innerWidth > 800
      ? (mesh.scale.x = mesh.scale.y = 10)
      : (mesh.scale.x = mesh.scale.y = 5)
    mesh.scale.z = 180
  }

  let animationState = false
  let numClicks = 0
  let intersect
  if (nodes) {
    setLoading(false)
  }
  const onLandingClick = () => {
    if (animationState) {
      return
    }
    animationState = true
    numClicks++
    for (let i = 0; i < Object.keys(nodes).length; i++) {
      if (raycaster.intersectObject(nodes[Object.keys(nodes)[i]]).length) {
        intersect = nodes[Object.keys(nodes)[i]]
      }
    }
    if (numClicks <= 3) {
      setTimeout(function() {
        animationState = false
      }, 50 + 50 * numClicks)
    } else {
      setTimeout(function() {
        animationState = false
      }, 3000)
    }
    clicked()
    if (numClicks > 3) {
      console.log("removed event listener")
      document.removeEventListener("click", onLandingClick)
    }
  }

  useFrame(({ clock, delta }) => {
    if (intersect && animationState && intersect.scale.x >= 0) {
      intersect.scale.x -= 0.07 * numClicks
      intersect.scale.y -= 0.07 * numClicks
      intersect.scale.z -= 0.07 * numClicks
      // intersect.rotation.x -= 0.07 * numClicks
    }
    if (animationState) {
      for (let i = 0; i < Object.keys(nodes).length; i++) {
        if (
          nodes[Object.keys(nodes)[i]].geometry &&
          nodes[Object.keys(nodes)[i]].scale.x > 0
        ) {
          nodes[Object.keys(nodes)[i]].scale.x -= 0.0005
          nodes[Object.keys(nodes)[i]].scale.y -= 0.0005
          nodes[Object.keys(nodes)[i]].scale.z -= 0.0005
          // nodes[Object.keys(nodes)[i]].position.x -= 0.001
          // nodes[Object.keys(nodes)[i]].position.y -= 0.001
        }
      }
    }
  })

  useEffect(() => {
    document.addEventListener("click", onLandingClick)
    return () => document.removeEventListener("click", onLandingClick)
  })

  return <></>
}
