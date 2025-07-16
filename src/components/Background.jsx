import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Background = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {

    const container = mountRef.current;
    const width = container ? container.offsetWidth : window.innerWidth;
    const height = container ? container.offsetHeight : window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); 
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;


    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 10;

    const resize = () => {

        const container = mountRef.current;
    
        if( container ) {
    
            const width = container.offsetWidth;
            const height = container.offsetHeight;
    
            renderer.setSize( width, height );
            renderer.setPixelRatio(window.devicePixelRatio);
    
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
    
        }
    
    }
    
    window.addEventListener( 'resize', resize );

    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
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