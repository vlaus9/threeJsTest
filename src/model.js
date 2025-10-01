import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'


let scene, camera, renderer;
let model;

showingModel()
animationScene()

function showingModel() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialise: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement)

    const loader = new GLTFLoader();
    loader.load(
        '../public/2CylinderEngine.gltf',
        (gltf) => {
            model = gltf.scene;
            scene.add(model);
        },
        undefined,
        (error) => {
            console.error('Ошибка загрузки модели', error)
        }
    );

    window.addEventListener( 'resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    })
}


function animationScene() {
    requestAnimationFrame(animationScene)

    if (model) {
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera)
}