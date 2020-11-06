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

  const { nodes } = useLoader(GLTFLoader, "/porcelain.glb")

  nodes.Voronoi_Fracture.rotation.x = -Math.PI / 2
  nodes.Voronoi_Fracture.scale.y = nodes.Voronoi_Fracture.scale.x = nodes.Voronoi_Fracture.scale.z = 326
  // nodes.Voronoi_Fracture.scale.y = 500

  // for (let i = 0; i < 20; i++) {
  //   nodes.Voronoi_Fracture.children[i].material = new MeshPhongMaterial({color: "blue"})
  // }

  scene.add(nodes.Voronoi_Fracture)

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
    for (let i = 0; i < nodes.Voronoi_Fracture.children.length; i++) {
      if (
        raycaster.intersectObject(nodes.Voronoi_Fracture.children[i]).length
      ) {
        intersect = nodes.Voronoi_Fracture.children[i]
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
      intersect.scale.x -= 0.007 * numClicks
      intersect.scale.y -= 0.007 * numClicks
      intersect.scale.z -= 0.007 * numClicks
    }
    if (animationState) {
      for (let i = 0; i < nodes.Voronoi_Fracture.children.length; i++) {
        if (
          nodes.Voronoi_Fracture.children[i].geometry &&
          nodes.Voronoi_Fracture.children[i].scale.x > 0
        ) {
          nodes.Voronoi_Fracture.children[i].scale.x -= 0.0005
          nodes.Voronoi_Fracture.children[i].scale.y -= 0.0005
          nodes.Voronoi_Fracture.children[i].scale.z -= 0.0005
          // nodes.Voronoi_Fracture.children[i].position.x -= 0.001
          // nodes.Voronoi_Fracture.children[i].position.y -= 0.001
        }
      }
    }
  })

  useEffect(() => {
    if (window.innerWidth < 800 && nodes) {
      nodes.Voronoi_Fracture.scale.y = nodes.Voronoi_Fracture.scale.x = nodes.Voronoi_Fracture.scale.z = 283
    }
    document.addEventListener("click", onLandingClick)
    return () => document.removeEventListener("click", onLandingClick)
  })

  return <></>
}
