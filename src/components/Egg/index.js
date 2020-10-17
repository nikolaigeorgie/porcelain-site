/* eslint-disable no-multi-assign */
/* eslint-disable func-names */
import React from "react"
// import { ShopifyContext } from "services/shopify"
import { useFrame, useThree } from "react-three-fiber"
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
    surfaceColor = [0, 0, 1],
    insideColor = [1, 1, 0],
    inverted = false
  } = props

  let eggMesh1, eggMesh2

  const settings = { progress: 0 }
  const loader = new GLTFLoader()
  loader.setDRACOLoader(new DRACOLoader().setDecoderPath("/draco/"))

  let voron = []
  const { scene } = useThree()

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
    vertexShader: `uniform float time;
    uniform float progress;
    uniform float inside;
    
    
    
    attribute vec3 centroid;
    attribute vec3 axis;
    attribute float offset;
    
    
    varying vec3 eye;
    varying vec3 vNormal;
    varying vec3 vReflect;
    
    mat4 rotationMatrix(vec3 axis, float angle) {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;
        
        return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                    0.0,                                0.0,                                0.0,                                1.0);
    }
    
    vec3 rotate(vec3 v, vec3 axis, float angle) {
      mat4 m = rotationMatrix(axis, angle);
      return (m * vec4(v, 1.0)).xyz;
    }
    
    vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
    }
    
    float easeInOutQuint(float t){
      return t < 0.5 ? 16.0 * t * t * t * t * t : 1.0 + 16.0 * (--t) * t * t * t * t;
    }
    float easeOutQuint(float t){
      return 1. + (--t) * t * t * t * t;
    }
    float easeOut(float t){
      return  t * t * t;
    }
    
    
    void main() {
    
    
      vec3 newposition = position;
    
      float vTemp =  1. - (position.y*0.9 + 1.)/2.;
    
      float tProgress = max(0.0, (progress - vTemp*0.2) /0.8);
    
      vec3 newnormal = rotate(normal,axis,tProgress*(3. + offset*10.));
      vNormal = newnormal;
    
      newposition = rotate(newposition - centroid,axis,(1. - vTemp)*tProgress*(3. + offset*10.)) + centroid;
      newposition += newposition + (1.5 - vTemp)*centroid*(tProgress)*(3. + vTemp*7. + offset*3.);
    
      eye = normalize( vec3( modelViewMatrix * vec4( newposition, 1.0 ) ) );
      vec4 worldPosition = modelMatrix * vec4( newposition, 1.0 );
      vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * newnormal );
      vec3 I = worldPosition.xyz - cameraPosition;
      vReflect = reflect( I, worldNormal );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( newposition, 1.0 );
    }`,
    fragmentShader: `uniform float time;
    uniform float progress;
    uniform float inside;
    uniform vec3 surfaceColor;
    uniform vec3 insideColor;
    uniform samplerCube tCube;
    
    varying vec2 vUv;
    varying vec2 vUv1;
    varying vec3 eye;
    varying vec3 vNormal;
    varying vec3 vReflect;
    
    
    void main()	{
    
        vec3 r = reflect( eye, vNormal );
        float m = 2. * sqrt( pow( r.x, 2. ) + pow( r.y, 2. ) + pow( r.z + 1., 2. ) );
        vec2 vN = r.xy / m + .5;
        vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );
    
        vec3 light = normalize(vec3(12.,10.,10.));
        vec3 light1 = normalize(vec3(-12.,-10.,-10.));
        float l = clamp(dot(light, vNormal),0.5,1.);
        l += clamp(dot(light1, vNormal),0.5,1.)/2.;
        // l /= 2.;
        
        if(inside>0.5){
            gl_FragColor = vec4(l,l,l,1.)*vec4(surfaceColor,1.);
        } else{
            gl_FragColor = reflectedColor*vec4(insideColor,1.);
        }
    
    }`
  })

  const material1 = material.clone()
  material1.uniforms.inside.value = 1

  // load the egg
  loader.load(
    "https://tympanus.net/Development/ExplodingObjects/models/egg-thick.glb",
    function(gltf) {
      const bbox = new THREE.Box3().setFromObject(gltf.scene)

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
      console.log("created mesh")
      scene.add(mesh)

      const s1 = BufferGeometryUtils.mergeBufferGeometries(geoms1, false)
      const mesh1 = new THREE.Mesh(s1, material1)
      mesh1.frustumCulled = false
      eggMesh2 = mesh1
      scene.add(mesh1)
      console.log("added both meshes to scene")
      mesh1.scale.x = mesh1.scale.y = mesh1.scale.z = 2.5
      mesh.scale.x = mesh.scale.y = mesh.scale.z = 2.5

      console.log(mesh)
      console.log(mesh1)
    },
    undefined,
    function(e) {
      console.error(e)
    }
  )

  useFrame(({ clock }) => {
    material.uniforms.progress.value = Math.abs(0.03)
    material1.uniforms.progress.value = Math.abs(0.03)
  })

  return (
    <group>
      {eggMesh1 && <primitive object={eggMesh1} position={[0, 0, 0]} />}
      {eggMesh2 && <primitive object={eggMesh2} position={[0, 0, 0]} />}
      {/* <mesh rotation={[Math.PI / 2, 1.2, Math.PI - 2]}>
        <boxBufferGeometry args={[3, 3, 3]} attach="geometry" />
        <meshNormalMaterial attach="material" />
      </mesh> */}
    </group>
  )
}
