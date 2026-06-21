"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

// One node per suite product — foreshadows the Global Supply Chain.
const NODES: [number, number, number][] = [
  [-3.0, -0.4, 0],
  [-1.5, 0.5, 0],
  [0.0, -0.5, 0],
  [1.5, 0.5, 0],
  [3.0, -0.4, 0],
];

function Chain() {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => NODES.map((n) => new THREE.Vector3(...n)), []);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={group}>
      {NODES.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.16, 32, 32]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.45} metalness={0.05} />
        </mesh>
      ))}
      <Line points={points} color="#0a0a0a" lineWidth={1.2} transparent opacity={0.6} />
    </group>
  );
}

export default function Hero3D() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.4}>
        <Chain />
      </Float>
    </Canvas>
  );
}
