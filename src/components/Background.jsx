import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Background = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

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

    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light for shadows and depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let planet = null;
    let mixer = null;
    let clock = new THREE.Clock();
    const loader = new GLTFLoader();

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-13.75, 9.07, -0.53),
      new THREE.Vector3(-9.10, 6.22, 0.16),
      new THREE.Vector3(-5.10, 3.17, -0.21),
      new THREE.Vector3(-5.45, 1.57, 1.92),
      new THREE.Vector3(-4.75, -0.98, -1.76),
      new THREE.Vector3(-0.70, -1.23, -0.33),
      new THREE.Vector3(2.70, -4.33, -0.14),
      new THREE.Vector3(7.55, -5.43, 0.60),
      new THREE.Vector3(12.75, -6.63, 0.12),
      new THREE.Vector3(13.25, -8.98, 0.83)
    ]);

    
    
    // Visualize the curve path 
    const points = curve.getPoints(100);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x444444, 
      opacity: 0.3, 
      transparent: true 
    });
    const curveObject = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(curveObject);

    // Load the Planet.glb file
    loader.load(
      '/src/assets/Planet.glb',
      (gltf) => {
        planet = gltf.scene;
        
        // Scale the planet if needed
        planet.scale.set(2, 2, 2);
        
        // Center the planet initially
        planet.position.set(0, 0, 0);
        
        scene.add(planet);
        
        // --- Step 2: Sample curve into times/values ---
        const times = [];
        const values = [];
        const duration = 15; // seconds for full path 
        
        const samples = 200; // More samples for smoother movement
        for (let i = 0; i <= samples; i++) {
          const t = i / samples;
          const pos = curve.getPointAt(t); // normalized (0..1)
          times.push(t * duration);
          values.push(pos.x, pos.y, pos.z);
        }
        
        // --- Step 3: Build keyframe track and animation ---
        const track = new THREE.VectorKeyframeTrack('.position', times, values);
        const clip = new THREE.AnimationClip('moveAlongPath', duration, [track]);
        
        mixer = new THREE.AnimationMixer(planet);
        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat); // Loop the animation
        action.play();
        
        // Hide loading state when planet is loaded
        setIsLoading(false);
      },
      (progress) => {
        const progressPercent = (progress.loaded / progress.total * 100);
        setLoadingProgress(progressPercent);
      },
      (error) => {
        console.error('Error loading GLB file:', error);
        // Fallback to a simple sphere if loading fails
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x33aaff });
        planet = new THREE.Mesh(geometry, material);
        scene.add(planet);
        
        // Apply the same animation to the fallback sphere
        const times = [];
        const values = [];
        const duration = 15;
        
        const samples = 200;
        for (let i = 0; i <= samples; i++) {
          const t = i / samples;
          const pos = curve.getPointAt(t);
          times.push(t * duration);
          values.push(pos.x, pos.y, pos.z);
        }
        
        const track = new THREE.VectorKeyframeTrack('.position', times, values);
        const clip = new THREE.AnimationClip('moveAlongPath', duration, [track]);
        
        mixer = new THREE.AnimationMixer(planet);
        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat);
        action.play();
        
        // Hide loading state even if there's an error
        setIsLoading(false);
      }
    );

    camera.position.z = 12;
    camera.position.y = 3;


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
        
        // Update the animation mixer for smooth movement along the curve
        if (mixer) {
            const delta = clock.getDelta();
            mixer.update(delta);
        }
        
        // Add some rotation to the planet while it moves along the path
        if (planet) {
            planet.rotation.x += 0.005;
            planet.rotation.y += 0.01;
        }
        

        
        renderer.render(scene, camera);
    };
    animate();

    return () => {
        if (rendererRef.current) {
            rendererRef.current.dispose();
            }
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            color: 'white',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            🌍 Loading Planet...
          </div>
          <div style={{ width: '300px', height: '20px', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px', overflow: 'hidden' }}>
            <div 
              style={{
                width: `${loadingProgress}%`,
                height: '100%',
                backgroundColor: '#4CAF50',
                transition: 'width 0.3s ease',
                borderRadius: '10px'
              }}
            />
          </div>
          <div style={{ marginTop: '1rem', fontSize: '1rem', opacity: 0.8 }}>
            {Math.round(loadingProgress)}%
          </div>
        </div>
      )}
      
      {/* 3D Scene */}
      <div ref={mountRef} style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: -1, pointerEvents: "none" }} />
    </>
  );
};

export default Background;