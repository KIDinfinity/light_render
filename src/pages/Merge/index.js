import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stats, useHelper } from "@react-three/drei"
import { Leva, useControls } from "leva"
import * as THREE from "three"

function LightsGroup() {
    // 主光（动态方向光）
    const keyLightRef = useRef()
    useHelper(keyLightRef, THREE.DirectionalLightHelper, 0.5, "red")

    // 补光（点光源）
    const fillLightRef = useRef()
    useHelper(fillLightRef, THREE.PointLightHelper, 0.3, "cyan")

    // 背光（聚光灯）
    const backLightRef = useRef()
    useHelper(backLightRef, THREE.SpotLightHelper, "yellow")

    const lightSettings = useControls("Lighting", {
        keyColor: "#ffffff",
        fillColor: "#ccccff",
        backColor: "#ffcccc",
        intensity: { value: 1.5, min: 0, max: 10 },
    })

    // 动态打光 - 主光围绕 Y 轴旋转
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        if (keyLightRef.current) {
            const radius = 5
            keyLightRef.current.position.x = Math.sin(t) * radius
            keyLightRef.current.position.z = Math.cos(t) * radius
        }
    })

    return (
        <>
            {/* 主光：方向光（可动） */}
            <directionalLight
                ref={keyLightRef}
                color={lightSettings.keyColor}
                intensity={lightSettings.intensity}
                position={[5, 5, 5]}
                castShadow
            />

            {/* 补光：点光源（静态） */}
            <pointLight
                ref={fillLightRef}
                color={lightSettings.fillColor}
                intensity={lightSettings.intensity * 0.6}
                position={[-3, 2, 3]}
                distance={20}
                decay={2}
                castShadow
            />

            {/* 背光：聚光灯（静态） */}
            <spotLight
                ref={backLightRef}
                color={lightSettings.backColor}
                intensity={lightSettings.intensity * 0.8}
                position={[0, 3, -5]}
                angle={Math.PI / 6}
                penumbra={0.5}
                castShadow
            />
        </>
    )
}

function SceneObject() {
    const material = useControls("Material", {
        color: "#dddddd",
        metalness: { value: 0.3, min: 0, max: 1 },
        roughness: { value: 0.4, min: 0, max: 1 },
    })

    return (
        <mesh castShadow position={[0, 1, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial {...material} />
        </mesh>
    )
}

export default function ThreePointLightingScene() {
    return (
        <>
            <Leva collapsed={false} />
            <Canvas
                shadows
                camera={{ position: [0, 3, 8], fov: 50 }}
                style={{ height: "100vh", background: "#222" }}
            >
                {/* 地面 */}
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="#777" />
                </mesh>

                {/* 模型 */}
                <SceneObject />

                {/* 三点打光 */}
                <LightsGroup />

                <OrbitControls />
                <Stats />
                <axesHelper args={[5]} />
            </Canvas>
        </>
    )
}
