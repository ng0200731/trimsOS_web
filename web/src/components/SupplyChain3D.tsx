"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { globalSupplyChain } from "@/data/products";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";

const steps = globalSupplyChain.steps;
const SPAN = 6;
const xFor = (i: number) =>
  (i - (steps.length - 1) / 2) * (SPAN / (steps.length - 1));

function Flow() {
  const dot = useRef<THREE.Mesh>(null);
  const pts = useMemo(
    () => steps.map((_, i) => new THREE.Vector3(xFor(i), 0, 0)),
    [],
  );
  useFrame(({ clock }) => {
    if (!dot.current) return;
    const t = (clock.getElapsedTime() * 0.25) % 1;
    const seg = t * (pts.length - 1);
    const i = Math.floor(seg);
    const f = seg - i;
    const a = pts[i];
    const b = pts[Math.min(i + 1, pts.length - 1)];
    dot.current.position.lerpVectors(a, b, f);
  });
  return (
    <>
      <Line points={pts} color="#0a0a0a" lineWidth={1.5} />
      {pts.map((p, i) => (
        <group key={i} position={p.toArray()}>
          <mesh>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.4} />
          </mesh>
          <Html center distanceFactor={10} position={[0, -0.7, 0]} wrapperClass="pointer-events-none">
            <div className="text-center">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink">
                {steps[i].label}
              </div>
              <div className="text-[10px] text-grey-500">{steps[i].tool}</div>
            </div>
          </Html>
        </group>
      ))}
      <mesh ref={dot}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#525252" />
      </mesh>
    </>
  );
}

function StaticFallback() {
  return (
    <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
      {steps.map((s, i) => (
        <div
          key={s.id}
          className="flex items-center gap-4 md:flex-1 md:flex-col md:text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-grey-300 text-sm font-semibold">
            {i + 1}
          </div>
          <div>
            <div className="text-sm font-semibold">{s.label}</div>
            <div className="text-xs text-grey-500">{s.tool}</div>
          </div>
          {i < steps.length - 1 && (
            <div
              className="hidden h-px flex-1 bg-grey-300 md:block"
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function SupplyChain3D() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduced || isMobile) {
    return (
      <div className="rounded-2xl border border-grey-200 bg-grey-50 p-8 md:p-12">
        <StaticFallback />
      </div>
    );
  }

  return (
    <div className="h-[360px] w-full md:h-[420px]">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 4, 6]} intensity={0.6} />
        <Flow />
      </Canvas>
    </div>
  );
}
