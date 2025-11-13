import { useRef, useState, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Model } from "./Trees";
import { Color } from "three";

export function Scene() {
  const refHouses = useRef(null);
  const refTreeA = useRef(null);
  const refTreeB = useRef(null);
  const refBase = useRef(null);
  const refDirt = useRef(null);

  const [showBase, setShowBase] = useState(false);
  const [showHouses, setShowHouses] = useState(false);
  const [showTrees, setShowTrees] = useState(false);

  // reveal animation bookkeeping
  const revealStartRef = useRef({
    houses: null,
    treeA: null,
    treeB: null,
    base: null,
  });

  const targetScalesRef = useRef({
    houses: 0.04,
    treeA: 0.087,
    treeB: 0.087,
    base: 0.05,
  });

  const revealDurationsRef = useRef({
    houses: 0.6,
    treeA: 0.6,
    treeB: 0.6,
    base: 0.9,
  });

  useFrame(() => {
    if (refHouses.current) {
      refHouses.current.rotation.y += 0.003;
    }
    if (refTreeA.current) {
      refTreeA.current.rotation.y += 0.0025;
    }
    if (refTreeB.current) {
      refTreeB.current.rotation.y += 0.002;
    }
    if (refBase.current) {
      refBase.current.rotation.y += 0.0015;
    }
    if (refDirt.current) {
      refDirt.current.rotation.y += 0.001;
    }

    // scale-in reveal animation
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

  // When model becomes shown, initialize reveal animation from tiny scale
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

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        color="white"
        position={[15, 15, 15]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Suspense fallback={null}>
        {showHouses && (
          <>
            <Model
              ref={refHouses}
              modelUrl="/Houses.glb"
              meshName="Houses"
              position={[-1.5, 0, 0]}
              scale={0.04}
              onClick={(e) => {
                e.stopPropagation();
                if (refHouses.current) refHouses.current.rotation.y += 0.25;
              }}
              colors={[
                new Color("#C1440E").convertLinearToSRGB(),
                new Color("#7A2E1E").convertLinearToSRGB(),
                new Color("#FFFFFF").convertLinearToSRGB(),
                new Color("#F5F5F5").convertLinearToSRGB(),
              ]}
            />
          </>
        )}

        {showTrees && (
          <>
            <Model
              ref={refTreeA}
              modelUrl="/Trees.glb"
              meshName="Sphere063_1"
              position={[0, -2, 0]}
              scale={0.087}
              onClick={(e) => {
                e.stopPropagation();
                if (refTreeA.current) refTreeA.current.rotation.y += 0.25;
              }}
              colors={[
                new Color("#427062").convertLinearToSRGB(),
                new Color("#33594E").convertLinearToSRGB(),
                new Color("#234549").convertLinearToSRGB(),
                new Color("#1E363F").convertLinearToSRGB(),
              ]}
            />
            <Model
              ref={refTreeB}
              modelUrl="/Trees.glb"
              meshName="Sphere063"
              position={[0, -2, 0]}
              scale={0.087}
              onClick={(e) => {
                e.stopPropagation();
                if (refTreeB.current) refTreeB.current.rotation.y += 0.25;
              }}
              colors={[
                new Color("#D2B48C").convertLinearToSRGB(),
                new Color("#A0522D").convertLinearToSRGB(),
                new Color("#8B4513").convertLinearToSRGB(),
                new Color("#5D4037").convertLinearToSRGB(),
              ]}
            />
          </>
        )}

        {showBase && (
          <>
            <Model
              ref={refBase}
              modelUrl="/Base.glb"
              meshName="Base"
              position={[0, 0, 0]}
              scale={0.05}
              onClick={(e) => {
                e.stopPropagation();
                if (refBase.current) refBase.current.rotation.y += 0.25;
              }}
              colors={[
                new Color("#E8C2A0").convertLinearToSRGB(),
                new Color("#D3936B").convertLinearToSRGB(),
                new Color("#B86A4B").convertLinearToSRGB(),
                new Color("#7A3B2E").convertLinearToSRGB(),
              ]}
            />

          </>
        )}

        <Model
          ref={refDirt}
          modelUrl="/Dirt.glb"
          meshName="Dirt"
          position={[0, -5, 0]}
          scale={0.05}
          onClick={(e) => {
            e.stopPropagation();
            if (refDirt.current) refDirt.current.rotation.y += 0.25;
          }}
          colors={[
            new Color("#C49A6C").convertLinearToSRGB(),
            new Color("#A47148").convertLinearToSRGB(),
            new Color("#8B5A2B").convertLinearToSRGB(),
            new Color("#5D4037").convertLinearToSRGB(),
          ]}
        />
      </Suspense>
    </>
  );
}
