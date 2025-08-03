import React, { useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stats, useHelper } from "@react-three/drei"
import { Leva, useControls } from "leva"
import * as THREE from "three"

function LightSwitcher() {
    const dirLightRef = useRef()
    const pointLightRef = useRef()
    const spotLightRef = useRef()
    const dynamicLightRef = useRef()
    const spotTargetRef = useRef()

    const { type } = useControls("Light Type", {
        type: { options: ["Directional", "Point", "Spot", "Dynamic"] }
    })

    const { color, intensity, x, y, z } = useControls("Light Config", {
        color: "#ffffff",
        intensity: { value: 1, min: 0, max: 100, step: 0.1 },
        x: { value: 5, min: -10, max: 10, step: 0.1 },
        y: { value: 5, min: -10, max: 10, step: 0.1 },
        z: { value: 5, min: -10, max: 10, step: 0.1 }
    })

    const lightColor = new THREE.Color(color)

    // 添加 helper
    useHelper(dirLightRef, THREE.DirectionalLightHelper, 0.5, "red")
    useHelper(pointLightRef, THREE.PointLightHelper, 0.3, "cyan")
    useHelper(spotLightRef, THREE.SpotLightHelper, "magenta")
    useHelper(dynamicLightRef, THREE.DirectionalLightHelper, 0.5, "orange")

    // Spot Light 的目标同步更新
    useFrame(() => {
        if (spotLightRef.current && spotTargetRef.current) {
            spotLightRef.current.target.position.copy(spotTargetRef.current.position)
        }

        // 动态光源旋转
        if (type === "Dynamic" && dynamicLightRef.current) {
            const t = performance.now() * 0.001
            const radius = 6
            dynamicLightRef.current.position.set(Math.sin(t) * radius, 5, Math.cos(t) * radius)
            dynamicLightRef.current.target.position.set(0, 0, 0)
            dynamicLightRef.current.target.updateMatrixWorld()
        }
    })

    return (
        <>
            {type === "Directional" && (
                <>
                    <directionalLight
                        ref={dirLightRef}
                        color={lightColor}
                        intensity={intensity}
                        position={[x, y, z]}
                        castShadow
                    />
                    <mesh position={[x, y, z]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshBasicMaterial color={color} />
                    </mesh>
                </>
            )}

            {type === "Point" && (
                <>
                    <pointLight
                        ref={pointLightRef}
                        color={lightColor}
                        intensity={intensity}
                        position={[x, y, z]}
                        distance={50}
                        decay={2}
                        castShadow
                    />
                    <mesh position={[x, y, z]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshBasicMaterial color={color} />
                    </mesh>
                </>
            )}

            {type === "Spot" && (
                <>
                    <spotLight
                        ref={spotLightRef}
                        color={lightColor}
                        intensity={intensity}
                        position={[x, y, z]}
                        angle={Math.PI / 6}
                        penumbra={0.3}
                        decay={2}
                        castShadow
                        target={spotTargetRef.current}
                    />
                    <mesh ref={spotTargetRef} position={[0, 0, 0]}>
                        <sphereGeometry args={[0.05, 8, 8]} />
                        <meshBasicMaterial color="yellow" />
                    </mesh>
                    <mesh position={[x, y, z]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshBasicMaterial color={color} />
                    </mesh>
                </>
            )}

            {type === "Dynamic" && (
                <>
                    <directionalLight
                        ref={dynamicLightRef}
                        color={lightColor}
                        intensity={intensity}
                        castShadow
                    />
                    {dynamicLightRef.current?.target && (
                        <primitive object={dynamicLightRef.current.target} />
                    )}
                </>
            )}
        </>
    )
}

function SceneObject() {
    const { color, metalness, roughness } = useControls("Material", {
        color: "#cccccc",
        metalness: { value: 0.4, min: 0, max: 1, step: 0.01 },
        roughness: { value: 0.5, min: 0, max: 1, step: 0.01 }
    })

    return (
        <mesh castShadow position={[0, 1, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
        </mesh>
    )
}

export default function LightingDemo() {
    return (
        <>
            <Leva collapsed={false} />
            <Canvas
                shadows
                camera={{ position: [0, 5, 10], fov: 50 }}
                style={{ background: "#202020", height: "100vh" }}
            >
                {/* 地面 */}
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <meshStandardMaterial color="#888888" />
                </mesh>

                {/* 物体 */}
                <SceneObject />

                {/* 光源 */}
                <LightSwitcher />

                <OrbitControls />
                <Stats />
                <axesHelper args={[10]} />
            </Canvas>
        </>
    )
}
