import * as THREE from 'three'

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);

    camera.position.z = 700;
    camera.position.y = 200;