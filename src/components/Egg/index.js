/* eslint-disable func-names */
import React from "react"
// import { ShopifyContext } from "services/shopify"
import { useFrame } from "react-three-fiber"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils"

import fragment from "./fragment.glsl"
import vertex from "./vertexEgg.glsl"

function getCentroid(geometry) {
  const ar = geometry.attributes.position.array
  const len = ar.length
  let x = 0,
    y = 0,
    z = 0
  for (let i = 0; i < len; i += 3) {
    x += ar[i]
    y += ar[i + 1]
    z += ar[i + 2]
  }
  return {
    x: (3 * x) / len,
    y: (3 * y) / len,
    z: (3 * z) / len
  }
}

function getRandomAxis() {
  return new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize()
}

function processSurface(v, j) {
  const c = v.position
  let vtemp, vtemp1

  vtemp = v.children[0].geometry.clone()
  vtemp = vtemp.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2))
  vtemp = vtemp.applyMatrix(new THREE.Matrix4().makeTranslation(c.x, c.y, c.z))

  vtemp1 = v.children[1].geometry
  vtemp1 = vtemp1.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2))
  vtemp1 = vtemp1
    .clone()
    .applyMatrix(new THREE.Matrix4().makeTranslation(c.x, c.y, c.z))

  const len = v.children[0].geometry.attributes.position.array.length / 3
  const len1 = v.children[1].geometry.attributes.position.array.length / 3

  const offset = new Array(len).fill(j / 100)
  vtemp.addAttribute(
    "offset",
    new THREE.BufferAttribute(new Float32Array(offset), 1)
  )

  const offset1 = new Array(len1).fill(j / 100)
  vtemp1.addAttribute(
    "offset",
    new THREE.BufferAttribute(new Float32Array(offset1), 1)
  )

  // axis
  const axis = getRandomAxis()
  const axes = new Array(len * 3).fill(0)
  const axes1 = new Array(len1 * 3).fill(0)
  for (let i = 0; i < len * 3; i += 3) {
    axes[i] = axis.x
    axes[i + 1] = axis.y
    axes[i + 2] = axis.z
  }
  vtemp.addAttribute(
    "axis",
    new THREE.BufferAttribute(new Float32Array(axes), 3)
  )

  for (let i = 0; i < len1 * 3; i += 3) {
    axes1[i] = axis.x
    axes1[i + 1] = axis.y
    axes1[i + 2] = axis.z
  }
  vtemp1.addAttribute(
    "axis",
    new THREE.BufferAttribute(new Float32Array(axes1), 3)
  )

  const centroidVector = getCentroid(vtemp)
  const centroid = new Array(len * 3).fill(0)
  const centroid1 = new Array(len1 * 3).fill(0)
  for (let i = 0; i < len * 3; i += 3) {
    centroid[i] = centroidVector.x
    centroid[i + 1] = centroidVector.y
    centroid[i + 2] = centroidVector.z
  }
  for (let i = 0; i < len1 * 3; i += 3) {
    centroid1[i] = centroidVector.x
    centroid1[i + 1] = centroidVector.y
    centroid1[i + 2] = centroidVector.z
  }
  vtemp.addAttribute(
    "centroid",
    new THREE.BufferAttribute(new Float32Array(centroid), 3)
  )
  vtemp1.addAttribute(
    "centroid",
    new THREE.BufferAttribute(new Float32Array(centroid1), 3)
  )

  return {
    surface: vtemp,
    volume: vtemp1
  }
}
export default function Egg(props) {
  const {
    surfaceColor = [0, 0, 0],
    insideColor = [1, 1, 1],
    backgroundColor,
    inverted = false
  } = props

  let eggMesh1, eggMesh2

  const settings = { progress: 0 }
  const loader = new GLTFLoader()
  loader.setDRACOLoader(
    new DRACOLoader().setDecoderPath(
      "https://tympanus.net/Development/ExplodingObjects/js/lib/draco/"
    )
  )

  const voron = []

  // load texture cube
  const path = "https://tympanus.net/Development/ExplodingObjects/img/newsky/"
  const format = ".jpg"
  const urls1 = [
    `${path}px${format}`,
    `${path}nx${format}`,
    `${path}py${format}`,
    `${path}ny${format}`,
    `${path}pz${format}`,
    `${path}nz${format}`
  ]
  const textureCube = new THREE.CubeTextureLoader().load(urls1)

  // init shader material
  const material = new THREE.ShaderMaterial({
    extensions: {
      derivatives: "#extension GL_OES_standard_derivatives : enable"
    },
    side: THREE.DoubleSide,
    uniforms: {
      time: {
        type: "f",
        value: 0
      },
      progress: {
        type: "f",
        value: 0
      },
      inside: {
        type: "f",
        value: 0
      },
      surfaceColor: {
        type: "v3",
        value: surfaceColor
      },
      insideColor: {
        type: "v3",
        value: insideColor
      },

      tCube: {
        value: textureCube
      },
      pixels: {
        type: "v2",
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      },
      uvRate1: {
        value: new THREE.Vector2(1, 1)
      }
    },
    vertexShader: vertex,
    fragmentShader: fragment
  })

  const material1 = material.clone()
  material1.uniforms.inside.value = 1

  // load the egg
  loader.load(
    "https://tympanus.net/Development/ExplodingObjects/models/egg-thick.glb",
    function(gltf) {
      //   const bbox = new THREE.Box3().setFromObject(gltf.scene)

      gltf.scene.traverse(function(child) {
        if (child.name === "Voronoi_Fracture") {
          if (child.children[0].children.length > 2) {
            child.children.forEach(f => {
              f.children.forEach(m => {
                voron.push(m.clone())
              })
            })
          } else {
            child.children.forEach(m => {
              voron.push(m.clone())
            })
          }
        }
      })

      const geoms = []
      const geoms1 = []
      let j = 0
      voron = voron.filter(v => {
        if (v.isMesh) {
          return false
        }

        j++
        const vtempo = processSurface(v, j)

        if (inverted) {
          geoms1.push(vtempo.surface)
          geoms.push(vtempo.volume)
        } else {
          geoms.push(vtempo.surface)
          geoms1.push(vtempo.volume)
        }

        return true
      })

      const s = BufferGeometryUtils.mergeBufferGeometries(geoms, false)
      const mesh = new THREE.Mesh(s, material)
      mesh.frustumCulled = false
      eggMesh1 = mesh
      //   scene.add(mesh)

      const s1 = BufferGeometryUtils.mergeBufferGeometries(geoms1, false)
      const mesh1 = new THREE.Mesh(s1, material1)
      mesh1.frustumCulled = false
      eggMesh2 = mesh1
      //   that.scene.add(mesh1)
    },
    undefined,
    function(e) {
      console.error(e)
    }
  )

  useFrame(({ clock }) => {
    material.uniforms.progress.value = Math.abs(settings.progress)
    material1.uniforms.progress.value = Math.abs(settings.progress)
  })

  return (
    <group>
      {eggMesh1 && <primitive object={eggMesh1} position={[0, 0, 0]} />}
      {eggMesh2 && <primitive object={eggMesh2} position={[0, 0, 0]} />}
      <mesh rotation={[Math.PI / 2, 1.2, Math.PI - 2]}>
        <boxBufferGeometry args={[3, 3, 3]} attach="geometry" />
        <meshNormalMaterial attach="material" />
      </mesh>
    </group>
  )
}
