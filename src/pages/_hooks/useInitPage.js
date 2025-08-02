import {useEffect} from 'react';
import * as THREE from 'three';
import {GLTFLoader} from '../../threeSource/libs/GLTFLoader';
import {Vector3} from '../../threeSource/libs/xviewer';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const useInitPage = ()=>{
    const scene = new THREE.Scene();
    let curControls;

    const gui = new GUI();
    const moveMap = {};
    let moveDirection = new Vector3(0, 0, 0);
    const renderGaoda = () => {
        const loader = new GLTFLoader();
        loader.load('/AyanamiRei.glb', function (gltf) {
            console.log("gltf", gltf)
            scene.add(gltf.scene);
        });
    }

const renderBall = () => {
  const geometry = new THREE.SphereGeometry(10, 32, 32); // 半径为10，细分为32段
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // 红色球体
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, 10, 0); // 把球体稍微抬高一点
  scene.add(sphere);
}

    const renderYing = () => {
        const renderer =  new THREE.WebGLRenderer({ canvas: document.querySelector('#webgl'), });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
        curControls = new OrbitControls(camera, renderer.domElement)
        camera.position.set(50, 50, 50);
        camera.lookAt(0, 0, 0);

        const cameraHelper =new THREE.CameraHelper(camera,50);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        const ambient = new THREE.AmbientLight(0xffffff, 1)
        directionalLight.position.set(150, 150, 150)
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        scene.add(directionalLight)
        scene.add(ambient)
        scene.add(cameraHelper);
        const loader = new GLTFLoader();
        console.log("loader____",loader)
        loader.load('/ying.glb', function (gltf) {
            console.log("gltf", gltf)
            scene.add(gltf.scene);
        });

        const render = () => {
            moveDirection = new Vector3(0, 0, 0);
            if (moveMap["w"]) moveDirection.z -= 1; // 向前
            if (moveMap["s"]) moveDirection.z += 1; // 向后
            if (moveMap["a"]) moveDirection.x -= 1; // 向左
            if (moveMap["d"]) moveDirection.x += 1; // 向右
            if (moveMap["arrowup"]) moveDirection.y += 1; // 向上
            if (moveMap["arrowdown"]) moveDirection.y -= 1; // 向下
            if (!moveDirection.equals(new Vector3(0, 0, 0))) {
                moveDirection.normalize().multiplyScalar(moveSpeed * 0.001);
                camera.position.copy(camera.position.add(moveDirection))
                curControls.target.set(camera.position.x, camera.position.y, camera.position.z - 10); // 假设视线向前
                curControls.update();
            }
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        render();
        renderer.render(scene, camera);
    }
    useEffect(()=>{
        renderGaoda();
        renderYing()
        renderBall();
        console.log("useInitPage")
    },[])
}

export default useInitPage;