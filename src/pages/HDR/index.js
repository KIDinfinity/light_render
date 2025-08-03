import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useEnvironment } from "@react-three/drei";
import * as THREE from "three";
import { LightProbeHelper } from "three/examples/jsm/helpers/LightProbeHelper.js";

function IBLScene() {
    const meshRef = useRef();
    const { scene, gl } = useThree();
    const envMap = useEnvironment({
        files: "royal_esplanade_1k.hdr",
        path: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/",
    });

    const lightProbeRef = useRef();
    const helperRef = useRef();

    useEffect(() => {
        if (!envMap) return;

        const pmremGenerator = new THREE.PMREMGenerator(gl);
        pmremGenerator.compileEquirectangularShader();
        const envMapPMREM = pmremGenerator.fromEquirectangular(envMap).texture;

        scene.environment = envMapPMREM;

        const lightProbe = new THREE.LightProbe();
        lightProbeRef.current = lightProbe;
        scene.add(lightProbe);

        const helper = new LightProbeHelper(lightProbe);
        helperRef.current = helper;
        scene.add(helper);

        envMap.dispose();
        pmremGenerator.dispose();

        return () => {
            scene.environment = null;
            if (lightProbeRef.current) scene.remove(lightProbeRef.current);
            if (helperRef.current) scene.remove(helperRef.current);
        };
    }, [envMap, gl, scene]);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
        }
        if (helperRef.current?.update) {
            helperRef.current.update();
        }
    });

    return (
        <>
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial metalness={0.7} roughness={0.2} />
            </mesh>

            <Environment
                files="royal_esplanade_1k.hdr"
                path="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/"
                background
            />
            <OrbitControls />
        </>
    );
}

export default function App() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
                <IBLScene />
            </Suspense>
        </Canvas>
    );
}
