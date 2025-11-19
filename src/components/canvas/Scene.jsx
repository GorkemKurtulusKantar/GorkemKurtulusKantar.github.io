import { useRef, useState, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Model } from "./Model";
import { Color, MathUtils, Box3, Vector3 } from "three";
import { Html } from "@react-three/drei";
import { COLORS } from "../../constants/colors";
import { SmokeBlobs } from "./SmokeBlobs";

export function Scene() {
  const rootRef = useRef(null);
  const orbitRef = useRef(null);
  const refHouses = useRef(null);
  const refTreeA = useRef(null);
  const refTreeB = useRef(null);
  const refBase = useRef(null);
  const refDirt = useRef(null);

  const [showBase, setShowBase] = useState(false);
  const [showHouses, setShowHouses] = useState(false);
  const [showTrees, setShowTrees] = useState(false);
  const [smoke, setSmoke] = useState({
    base: false,
    houses: false,
    trees: false,
  });

  const mouseTargetRef = useRef({ x: 0, y: 0 });

  // reveal animation bookkeeping
  const revealStartRef = useRef({
    houses: null,
    treeA: null,
    treeB: null,
    base: null,
  });

  const targetScalesRef = useRef({
    houses: 0.050,
    treeA: 0.050,
    treeB: 0.050,
    base: 0.050,
    dirt: 0.039,
  });

  const revealDurationsRef = useRef({
    houses: 0.6,
    treeA: 0.6,
    treeB: 0.6,
    base: 0.9,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseTargetRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    const isRevealed = (key) => revealStartRef.current[key] === null;

    if (rootRef.current) {
      const targetRotY = mouseTargetRef.current.x * 0.4;
      const targetRotX = -mouseTargetRef.current.y * 0.2;
      rootRef.current.rotation.y = MathUtils.lerp(
        rootRef.current.rotation.y,
        targetRotY,
        0.04
      );
      rootRef.current.rotation.x = MathUtils.lerp(
        rootRef.current.rotation.x,
        targetRotX,
        0.04
      );
    }

    if (orbitRef.current && isRevealed("houses") && isRevealed("treeA") && isRevealed("treeB")) {
      orbitRef.current.rotation.y += 0.0015;
    }
    if (refBase.current && isRevealed("base")) {
      refBase.current.rotation.y += 0.001;
    }
    if (refDirt.current) {
      refDirt.current.rotation.y += 0.001;
    }

    const now = performance.now() / 1000;
    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
    const epsilon = 0.0001;

    const drive = (ref, key) => {
      const start = revealStartRef.current[key];
      if (!start || !ref.current) return;
      const dur = revealDurationsRef.current[key];
      const t = Math.min(1, (now - start) / dur);
      const eased = easeOutCubic(t);
      const target = targetScalesRef.current[key];
      const s = epsilon + (target - epsilon) * eased;
      ref.current.scale.setScalar(s);
      if (t >= 1) {
        ref.current.scale.setScalar(target);
        revealStartRef.current[key] = null;
      }
    };

    drive(refHouses, "houses");
    drive(refTreeA, "treeA");
    drive(refTreeB, "treeB");
    drive(refBase, "base");
  });

  useEffect(() => {
    Model.preload("/Base.glb");
    Model.preload("/Houses.glb");
    Model.preload("/Trees.glb");
    Model.preload("/Dirt.glb");
  }, []);

  useEffect(() => {
    const pairs = [
      { id: "about", setter: setShowBase, key: "base", delay: 220 },
      { id: "projects", setter: setShowHouses, key: "houses", delay: 150 },
      { id: "contact", setter: setShowTrees, key: "trees", delay: 130 },
    ];
    const observers = [];

    pairs.forEach(({ id, setter, key, delay }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => setter(true), delay);
            }
          });
        },
        { root: null, threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const onScrollFallback = () => {
      const y = window.scrollY || 0;
      const h =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const p = y / h;
      if (p > 0.1 && !showBase) {
        setTimeout(() => setShowBase(true), 220);
      }
      if (p > 0.35 && !showHouses) {
        setTimeout(() => setShowHouses(true), 150);
      }
      if (p > 0.6 && !showTrees) {
        setTimeout(() => setShowTrees(true), 130);
      }
    };

    onScrollFallback();

    if (observers.length === 0) {
      window.addEventListener("scroll", onScrollFallback, { passive: true });
      onScrollFallback();
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      if (observers.length === 0) {
        window.removeEventListener("scroll", onScrollFallback);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showHouses && refHouses.current && !revealStartRef.current.houses) {
      refHouses.current.scale.setScalar(0.0001);
      revealStartRef.current.houses = performance.now() / 1000;
    }
  }, [showHouses]);

  useEffect(() => {
    if (showTrees && refTreeA.current && !revealStartRef.current.treeA) {
      refTreeA.current.scale.setScalar(0.0001);
      revealStartRef.current.treeA = performance.now() / 1000;
    }
    if (showTrees && refTreeB.current && !revealStartRef.current.treeB) {
      refTreeB.current.scale.setScalar(0.0001);
      revealStartRef.current.treeB = performance.now() / 1000;
    }
  }, [showTrees]);

  useEffect(() => {
    if (showBase && refBase.current && !revealStartRef.current.base) {
      refBase.current.scale.setScalar(0.0001);
      revealStartRef.current.base = performance.now() / 1000;
    }
  }, [showBase]);

  useEffect(() => {
    if (!showHouses) return;
    setSmoke((prev) => ({ ...prev, houses: true }));
    const timeout = setTimeout(
      () => setSmoke((prev) => ({ ...prev, houses: false })),
      2500
    );
    return () => clearTimeout(timeout);
  }, [showHouses]);

  useEffect(() => {
    if (!showTrees) return;
    setSmoke((prev) => ({ ...prev, trees: true }));
    const timeout = setTimeout(
      () => setSmoke((prev) => ({ ...prev, trees: false })),
      2500
    );
    return () => clearTimeout(timeout);
  }, [showTrees]);

  useEffect(() => {
    if (!showBase) return;
    setSmoke((prev) => ({ ...prev, base: true }));
    const timeout = setTimeout(
      () => setSmoke((prev) => ({ ...prev, base: false })),
      2500
    );
    return () => clearTimeout(timeout);
  }, [showBase]);

  return (
    <>
      <fog attach="fog" args={["#000000", 4, 12]} />
      <ambientLight intensity={1.2} />
      <directionalLight
        color="white"
        position={[15, 15, 15]}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
      />

      <Suspense fallback={<Html center wrapperClass="r3f-fallback"><div className="loader"></div></Html>}>
        <group ref={rootRef} position={[0, 0, 0]}>
          <group ref={orbitRef} position={[0, 0, 0]}>
            {showHouses && (
              <>
                <Model
                  ref={refHouses}
                  modelUrl="/Houses.glb"
                  meshName="Houses"
           
                  onClick={(e) => {
                    e.stopPropagation();
                    if (orbitRef.current) orbitRef.current.rotation.y += 0.25;
                  }}
                  colors={COLORS.model.houses.map((hex) =>
                    new Color(hex).convertLinearToSRGB()
                  )}
                />
                {smoke.houses && (
                  <SmokeBlobs origin={[0, 0.4, 0]} duration={2.5} />
                )}
              </>
            )}

            {showTrees && (
              <>
                <Model
                  ref={refTreeA}
                  modelUrl="/Trees.glb"
                  meshName="Sphere005_1"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (orbitRef.current) orbitRef.current.rotation.y += 0.25;
                  }}
                  colors={COLORS.model.treesFoliage.map((hex) =>
                    new Color(hex).convertLinearToSRGB()
                  )}
                />
                <Model
                  ref={refTreeB}
                  modelUrl="/Trees.glb"
                  meshName="Sphere005"

                  onClick={(e) => {
                    e.stopPropagation();
                    if (orbitRef.current) orbitRef.current.rotation.y += 0.25;
                  }}
                  colors={COLORS.model.treesBark.map((hex) =>
                    new Color(hex).convertLinearToSRGB()
                  )}
                />
                {smoke.trees && (
                  <SmokeBlobs origin={[0, 0.2, 0]} duration={2.5} />
                )}
              </>
            )}
          </group>

          {showBase && (
            <>
              <Model
                ref={refBase}
                modelUrl="/Base.glb"
                meshName="Base"
           
                onClick={(e) => {
                  e.stopPropagation();
                  if (orbitRef.current) orbitRef.current.rotation.y += 0.25;
                }}
                colors={COLORS.model.base.map((hex) =>
                  new Color(hex).convertLinearToSRGB()
                )}
              />
              {smoke.base && <SmokeBlobs origin={[0, 0, 0]} duration={2.5} />}
            </>
          )}

          <Model
            ref={refDirt}
            modelUrl="/Dirt.glb"
            meshName="Dirt"
            scale={0.049}
            onClick={(e) => {
              e.stopPropagation();
              if (refDirt.current) refDirt.current.rotation.y += 0.25;
            }}
            colors={COLORS.model.dirt.map((hex) =>
              new Color(hex).convertLinearToSRGB()
            )}
          />
        </group>
      </Suspense>
    </>
  );
}
