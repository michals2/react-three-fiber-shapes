import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame, apply, useRender, useThree } from 'react-three-fiber'
import * as THREE from 'three'
import './styles.css'

function Controls(props) {
  const ref = useRef()
  const { camera } = useThree()
  useRender(() => {
    console.log('Controls -> useRender -> camera', camera)
    ref.current.obj.update()
  })
  return <orbitControls ref={ref} args={[camera]} {...props} />
}

const Box = () => {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

const Circle = () => {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
  return (
    <mesh ref={ref} position={[0, 2, 0]}>
      <circleBufferGeometry attach="geometry" args={[0.5, 100]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

const App = () => {
  const [activePartId, setActivePartId] = useState(0)
  const parts = [{ id: 0, Component: Box }, { id: 1, Component: Circle }]
  return (
    <Canvas>
      {parts.map(part => (
        <part.Component
          active={activePartId === part.id}
          activatePart={() => {
            setActivePartId(part.id)
          }}
        />
      ))}
    </Canvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
