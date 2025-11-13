import { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import { GhibliShader } from "./GhibliShader";

export const Model = forwardRef((props, ref) => {
  const {
    modelUrl = "/Trees.glb",
    meshName,
    colors,
    thresholds = [0.6, 0.35, 0.001],
    ...rest
  } = props;

  const { nodes } = useGLTF(modelUrl);

  const uniforms = useMemo(
    () => ({
      colorMap: {
        value: colors,
      },
      brightnessThresholds: {
        value: thresholds,
      },
      lightPosition: { value: new Vector3(15, 15, 15) },
    }),
    [colors, thresholds]
  );

  console.log(nodes);
  const targetMesh = useMemo(() => {
    if (!nodes) return undefined;
    if (meshName && nodes[meshName] && nodes[meshName].geometry) {
      return nodes[meshName];
    }
    return undefined;
  }, [nodes, meshName]);

  return (
    <group {...rest} ref={ref} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={targetMesh?.geometry || undefined}
        position={[0.33, -0.05, -0.68]}
      >
        <shaderMaterial
          attach="material"
          {...GhibliShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
});

Model.preload = (url) => useGLTF.preload(url);



