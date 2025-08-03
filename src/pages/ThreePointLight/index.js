import React, { useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Stats, AxesHelper, useGLTF } from "@react-three/drei"
import { Leva, useControls } from "leva"
import * as THREE from "three";

function Model({ type, materialProps }: { type: string; materialProps: any }) {
    const gltf = useGLTF("/robot.glb")
    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true

                const material = child.material
                if (material.map) {
                    // ✅ 设置贴图为 sRGB 色彩空间
                    material.map.colorSpace = THREE.SRGBColorSpace
                }
            }
        })
    }, [gltf])
    console.log("gltf", gltf)
    if (type === "ying") {
        return (
            <primitive
                object={gltf.scene}
                scale={0.5}
                position={[0, 0, 0]}
                castShadow
            />
        )
    }
    return (
        <mesh castShadow position={[0, 1, 0]}>
            {type === "Sphere" && <sphereGeometry args={[1, 32, 32]} />}
            {type === "Cube" && <boxGeometry args={[2, 2, 2]} />}
            {type === "Icosahedron" && <icosahedronGeometry args={[1, 0]} />}
            <meshStandardMaterial {...materialProps} />
        </mesh>
    )
}

export default function LightingScene() {
    const keyLight = useControls("Key Light", {
        intensity: { value: 1.2, min: 0, max: 5 },
        color: "#ff0000",
        position: { value: { x: 0, y: 2.2, z: 2.0 } }
    })

    const fillLight = useControls("Fill Light", {
        intensity: { value: 0.5, min: 0, max: 5 },
        color: "#00ff00",
        position: { value: { x: -2.0, y: 2.0, z: 0.2 } }
    })

    const rimLight = useControls("Rim Light", {
        intensity: { value: 0.6, min: 0, max: 5 },
        color: "#0000ff",
        position: { value: { x: 0, y: 2.0, z: -2.0 } }
    })

    const { model, color, metalness, roughness } = useControls("Material", {
        model: { options: ["Sphere", "Cube", "Icosahedron", "ying"] },
        color: "#cccccc",
        metalness: { value: 0.4, min: 0, max: 1, step: 0.01 },
        roughness: { value: 0.5, min: 0, max: 1, step: 0.01 }
    })

    return (
        <>
            <Leva collapsed={false} />
            <Canvas legacy={false} shadows camera={{ position: [0, 10, 10], fov: 50 }} style={{ background: "#202020" }}>
                <axesHelper args={[8]} />
                {/* <ambientLight intensity={0.15} /> */}

                {/* 三点光源 */}
                <directionalLight
                    castShadow
                    color={keyLight.color}
                    intensity={keyLight.intensity}
                    position={[keyLight.position.x, keyLight.position.y, keyLight.position.z]}
                />
                <directionalLight
                    color={fillLight.color}
                    intensity={fillLight.intensity}
                    position={[fillLight.position.x, fillLight.position.y, fillLight.position.z]}
                />
                <directionalLight
                    color={rimLight.color}
                    intensity={rimLight.intensity}
                    position={[rimLight.position.x, rimLight.position.y, rimLight.position.z]}
                />

                {/* 光源辅助球体 */}
                {[keyLight, fillLight, rimLight].map((light, idx) => (
                    <mesh
                        key={idx}
                        position={[light.position.x, light.position.y, light.position.z]}
                    >
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshBasicMaterial color={light.color} />
                    </mesh>
                ))}

                {/* 模型 */}
                <Model
                    type={model}
                    materialProps={{
                        color,
                        metalness,
                        roughness
                    }}
                />

                {/* 地面 */}
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <shadowMaterial opacity={0.3} />
                </mesh>

                <OrbitControls />
                {/* <Environment preset="sunset" background={false} /> */}
                <Stats />
            </Canvas>
        </>
    )
}
