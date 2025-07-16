import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Background = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    return () => {
        if (rendererRef.current) {
            rendererRef.current.dispose();
        }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 0 ,pointerEvents: "none"}} />;
};

export default Background;