/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable func-names */
import React, { useEffect } from "react"
import * as THREE from "three"
import { useLoader, useFrame, useThree } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

var j

export default function VoronWall(props) {
  const { clicked, setLoading } = props
  const { scene, raycaster, gl } = useThree()

  const mobile = window.innerWidth < 800
  const { nodes } = !mobile  ? useLoader(GLTFLoader, "/porcelain7.glb") : useLoader(GLTFLoader, "/mobilefracture.glb")

  let mesh
  console.log(nodes)

  if (nodes && nodes.length > 0) {
    nodes[0].material.map.encoding = THREE.RGBM16Encoding
  }

  nodes[Object.keys(nodes)[12]].rotation.y = Math.PI

  for (let i = 0; i < Object.keys(nodes).length; i++) {
    mesh = nodes[Object.keys(nodes)[i]]

    if (Object.keys(nodes)[i] === "Camera") {
      // eslint-disable-next-line no-continue
      continue
    }

    scene.add(mesh)
    const locScale = mobile ? 0.06 : window.innerWidth > 800 ? 15 : 0.1
    mesh.scale.set(locScale, locScale, locScale)
    mesh.position.y = mobile ? 0 : 5.3 // into the page
    mesh.position.z = 0 // up and down
    mesh.position.x = 0 // left and right
    mesh.rotation.x = -Math.PI / 2
    mesh.rotation.y = Math.PI
    // mesh.rotation.z = Math.PI

    if (mesh.material) {
      mesh.material.map.minFilter = THREE.LinearFilter
      mesh.material.map.anisotropy = gl.capabilities.getMaxAnisotropy()
    }
  }

  let animationState = false
  let numClicks = 0
  const intersect = []
  const furthestBack = mobile  ? 100: 20
  if (nodes) {
    setLoading(false)
  }
  const onLandingClick = () => {
    console.log(j)
    if (animationState) {
      return
    }
    animationState = true
    numClicks++
    for (let i = 0; i < Object.keys(nodes).length; i++) {
      if (raycaster.intersectObject(nodes[Object.keys(nodes)[i]]).length) {
        if (!intersect.includes(intersect.push)) {
          intersect.push(nodes[Object.keys(nodes)[i]])
        }
      }
    }
    if (numClicks <= 8) {
      setTimeout(function() {
        animationState = false
      }, 50 + 50 * numClicks)
    } else {
      setTimeout(function() {
        animationState = false
      }, 3000)
    }
    clicked()
    if (numClicks > 8) {
      console.log("removed event listener")
      document.removeEventListener("click", onLandingClick)
    }
  }

  useFrame(({ clock }, delta) => {
    if (numClicks > 8) {
      for (let i = 0; i < Object.keys(nodes).length; i++) {
        const node = nodes[Object.keys(nodes)[i]]
        const hash = hashString(node.uuid)
        const sinX = (hash % 20) - 10 > 1 ? 1 : -1
        const sinY = (hash % 8) - 4 > 1 ? 1 : -1
        node.position.x += ((hash % 5) + 1) * sinX * delta * 0.1
        node.position.z += ((hash % 5) + 1) * sinY * delta * 0.1
        node.position.y -= furthestBack * delta * 0.1
        node.rotation.x += delta * ((hash % 5) + 1) * 0.1
        node.rotation.z += delta * ((hash % 5) + 1) * 0.1
        node.rotation.y += delta * ((hash % 5) + 1) * 0.1
      }
    } else if (intersect) {
      for (const [i, node] of intersect.entries()) {
        const hash = hashString(node.uuid)
        const sinX = (hash % 20) - 10 > 1 ? 1 : -1
        const sinY = (hash % 8) - 4 > 1 ? 1 : -1
        node.position.x += ((hash % 5) + 1) * sinX * delta * 0.1
        node.position.z += ((hash % 5) + 1) * sinY * delta * 0.1
        node.position.y -= furthestBack * delta * 0.1
        node.rotation.x += delta * ((hash % 5) + 1) * 0.1
        node.rotation.z += delta * ((hash % 5) + 1) * 0.1
        node.rotation.y += delta * ((hash % 5) + 1) * 0.1
        j = i
      }
    }
  })

  useEffect(() => {
    document.addEventListener("click", onLandingClick)
    return () => document.removeEventListener("click", onLandingClick)
  })

  return <></>
}

const hashString = s => {
  let hash = 0,
    i,
    chr
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i)
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr
    // eslint-disable-next-line no-bitwise
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}
