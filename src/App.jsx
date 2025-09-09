import React, { useRef, useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { scene, camera } from './assets/scene.jsx'
import DraggingWindow from './DraggingWindow.jsx'


export default function App () {
    
    const mountRef = useRef(null);
    
    useEffect(() => {
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(10000, 100);
    gridHelper.material.opacity = 0.9;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    const axes = new THREE.AxesHelper(5);
    scene.add(axes);
    

    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
        
    if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
    }

   const loader = new GLTFLoader();
        loader.load(
            '/2CylinderEngine.gltf',
            (gltf) => {
                scene.add(gltf.scene)
                animate();
            },
            undefined,
            (error) => {
                console.error('Ошибка загрузки модели', error)
            }
        );

        // const geometry = new THREE.BoxGeometry();
        // const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);

        const controls = new OrbitControls(camera, renderer.domElement);

        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        controls.minDistance = 2;
        controls.maxDistance = 1000;

        const animate = () => {
            requestAnimationFrame(animate);

            // cube.rotation.y += 0.01;
            // cube.rotation.x += 0.01;

            controls.update();
            renderer.render(scene, camera);
        }
        
        animate();

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            renderer.setSize(width, height);

            camera.aspect = width / height;
            camera.updateProjectionMatrix()
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

        if(mountRef.current) {
            mountRef.current.removeChild(renderer.domElement)
        }

        controls.dispose();
    };          


    }, []);

    return (
        <div style={{position: 'relative', width: '100vw', height: '100vh'}}>
            <div ref={mountRef} style={{position: 'absolute', width: '100%', height: '100%'}}></div>
                <DraggingWindow/>
            </div>
    )
    


}
