import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const params = {
  blobColor: 0x00ffff,
  blobNumber: 10,
  maxRadius: 6,
  lerpFactor: 0.05
};

export function SmokeBlobs({ origin = [0, 0, 0], duration = 2.5 }) {
  const groupRef = useRef();
  const originRef = useRef(new THREE.Vector3(origin[0], origin[1], origin[2]));
  const spawnTimeRef = useRef(null);

  useEffect(() => {
    originRef.current.set(origin[0], origin[1], origin[2]);
  }, [origin]);

  const blobs = useMemo(() => {
    const instances = [];
    for (let i = 0; i < params.blobNumber; i++) {
      const direction = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();
      const maxDistance = params.maxRadius * Math.random();
      const scale = 0.5 + Math.random() * 0.7;
      instances.push({
        direction,
        maxDistance,
        scale
      });
    }
    return instances;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    if (spawnTimeRef.current === null) {
      spawnTimeRef.current = clock.getElapsedTime();
    }

    const elapsed = clock.getElapsedTime() - spawnTimeRef.current;
    const t = Math.min(1, elapsed / duration);
    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
    const eased = easeOutCubic(t);

    const children = groupRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const object = children[i];
      const blob = blobs[i];
      const target = originRef.current
        .clone()
        .addScaledVector(blob.direction, blob.maxDistance * eased);

      object.position.lerp(target, params.lerpFactor);

      const baseScale = blob.scale;
      const scaleFactor = 0.7 + eased;
      object.scale.setScalar(baseScale * scaleFactor);

      if (object.material) {
        // Smooth, gradual fade: starts opaque, then eases to 0 near the end
        const alpha = 1 - t * t;
        object.material.opacity = alpha;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {blobs.map(({ position, scale, visible }, idx) => (
        <mesh
          key={idx}
          position={originRef.current}
          scale={scale}
          visible
        >
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshBasicMaterial
            color={params.blobColor}
            transparent
            opacity={1}
            fog={false}
          />
        </mesh>
      ))}
    </group>
  );
}


