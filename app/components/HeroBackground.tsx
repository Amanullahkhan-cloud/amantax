'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Large Animated Bar Chart (Center)
function BarChart() {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);
  
  const barData = useMemo(() => [
    { x: -6, height: 2.5, delay: 0 },
    { x: -4, height: 3.5, delay: 0.2 },
    { x: -2, height: 2.8, delay: 0.4 },
    { x: 0, height: 4.5, delay: 0.6 },
    { x: 2, height: 3.8, delay: 0.8 },
    { x: 4, height: 5, delay: 1 },
    { x: 6, height: 4.2, delay: 1.2 },
  ], []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        const targetHeight = barData[i].height * (0.6 + Math.sin(time * 0.4 + barData[i].delay * 3) * 0.4);
        bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, targetHeight, 0.03);
        bar.position.y = (bar.scale.y / 2) - 4;
      }
    });
    
    if (groupRef.current) {
      groupRef.current.rotation.y = state.pointer.x * 0.15;
      groupRef.current.rotation.x = state.pointer.y * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, -5]}>
      {barData.map((bar, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) barsRef.current[i] = el; }}
          position={[bar.x, 0, 0]}
        >
          <boxGeometry args={[1.2, 1, 0.5]} />
          <meshBasicMaterial color="#34D399" transparent opacity={0.2} />
        </mesh>
      ))}
      {/* Base line */}
      <mesh position={[0, -4, 0]}>
        <boxGeometry args={[16, 0.08, 0.3]} />
        <meshBasicMaterial color="#34D399" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Large Flowing Line Chart
function LineChart() {
  const lineRef = useRef<THREE.Line>(null);
  const pointCount = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      pos[i * 3] = (i / pointCount) * 24 - 12;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = -3;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.elapsedTime;
      const posArray = lineRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < pointCount; i++) {
        const x = (i / pointCount) * 24 - 12;
        const trend = (i / pointCount) * 3;
        const wave = Math.sin(i * 0.15 + time * 0.8) * 1;
        const noise = Math.sin(i * 0.4 + time * 0.3) * 0.5;
        posArray[i * 3 + 1] = trend + wave + noise - 2;
      }
      
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    // @ts-ignore - Three.js line element, not SVG
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#6EE7B7" transparent opacity={0.6} linewidth={3} />
    </line>
  );
}

// Second Line Chart (Different color)
function LineChart2() {
  const lineRef = useRef<THREE.Line>(null);
  const pointCount = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      pos[i * 3] = (i / pointCount) * 24 - 12;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = -4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.elapsedTime;
      const posArray = lineRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < pointCount; i++) {
        const trend = (i / pointCount) * 2.5;
        const wave = Math.sin(i * 0.12 + time * 0.6 + 1) * 0.8;
        const noise = Math.sin(i * 0.3 + time * 0.4 + 2) * 0.4;
        posArray[i * 3 + 1] = trend + wave + noise - 3;
      }
      
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    // @ts-ignore - Three.js line element, not SVG
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#10B981" transparent opacity={0.4} linewidth={2} />
    </line>
  );
}

// Large Pie Chart
function PieChart() {
  const groupRef = useRef<THREE.Group>(null);
  
  const segments = useMemo(() => {
    const segs: { geometry: THREE.BufferGeometry; color: string }[] = [];
    const angles = [
      { start: 0, end: Math.PI * 0.6, color: '#34D399' },
      { start: Math.PI * 0.6, end: Math.PI * 1.1, color: '#10B981' },
      { start: Math.PI * 1.1, end: Math.PI * 1.6, color: '#6EE7B7' },
      { start: Math.PI * 1.6, end: Math.PI * 2, color: '#059669' },
    ];
    
    angles.forEach(({ start, end, color }) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      const segments = 32;
      for (let i = 0; i <= segments; i++) {
        const angle = start + (end - start) * (i / segments);
        shape.lineTo(Math.cos(angle) * 2.5, Math.sin(angle) * 2.5);
      }
      shape.lineTo(0, 0);
      
      const geometry = new THREE.ShapeGeometry(shape);
      segs.push({ geometry, color });
    });
    
    return segs;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.z = time * 0.15;
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[8, 1, -6]}>
      {segments.map((seg, i) => (
        <mesh key={i} geometry={seg.geometry}>
          <meshBasicMaterial color={seg.color} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

// Floating Currency/Finance Cubes
function FinanceCubes() {
  const groupRef = useRef<THREE.Group>(null);
  
  const cubes = useMemo(() => [
    { position: [-8, 3, -3] as [number, number, number], size: 1.2, speed: 0.3 },
    { position: [9, 2, -4] as [number, number, number], size: 0.9, speed: 0.4 },
    { position: [-7, -2, -5] as [number, number, number], size: 1, speed: 0.35 },
    { position: [7, -3, -4] as [number, number, number], size: 0.8, speed: 0.45 },
    { position: [-10, 0, -6] as [number, number, number], size: 1.1, speed: 0.32 },
    { position: [10, 0, -5] as [number, number, number], size: 0.85, speed: 0.38 },
    { position: [0, 5, -4] as [number, number, number], size: 1.3, speed: 0.28 },
    { position: [-5, -4, -4] as [number, number, number], size: 0.7, speed: 0.42 },
    { position: [5, 4, -5] as [number, number, number], size: 0.95, speed: 0.36 },
    { position: [-3, 4, -3] as [number, number, number], size: 0.75, speed: 0.4 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.children.forEach((child, i) => {
        child.position.y = cubes[i].position[1] + Math.sin(time * cubes[i].speed + i) * 0.8;
        child.rotation.x = time * 0.2 + i;
        child.rotation.y = time * 0.3 + i * 0.5;
      });
      
      groupRef.current.rotation.y = state.pointer.x * 0.1;
      groupRef.current.rotation.x = state.pointer.y * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position}>
          <boxGeometry args={[cube.size, cube.size, cube.size * 0.3]} />
          <meshBasicMaterial 
            color={i % 3 === 0 ? '#34D399' : i % 3 === 1 ? '#10B981' : '#6EE7B7'} 
            transparent 
            opacity={0.12} 
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating Document Icons
function Documents() {
  const groupRef = useRef<THREE.Group>(null);
  
  const docs = useMemo(() => [
    { position: [-9, 2, -3] as [number, number, number], rotation: 0.3 },
    { position: [8, -1, -4] as [number, number, number], rotation: -0.2 },
    { position: [-6, -3, -5] as [number, number, number], rotation: 0.5 },
    { position: [6, 3, -4] as [number, number, number], rotation: -0.4 },
    { position: [-4, 4, -3] as [number, number, number], rotation: 0.2 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.children.forEach((doc, i) => {
        doc.position.y = docs[i].position[1] + Math.sin(time * 0.5 + i * 2) * 0.4;
        doc.rotation.z = Math.sin(time * 0.3 + i) * 0.15 + docs[i].rotation;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {docs.map((doc, i) => (
        <group key={i} position={doc.position}>
          <mesh>
            <planeGeometry args={[1, 1.3]} />
            <meshBasicMaterial color="#34D399" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
          {[-0.35, -0.1, 0.15, 0.4].map((y, j) => (
            <mesh key={j} position={[0, y, 0.01]}>
              <planeGeometry args={[0.65, 0.06]} />
              <meshBasicMaterial color="#34D399" transparent opacity={0.18} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// Rich Money Flow Particles
function MoneyParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
      vel[i] = Math.random() * 0.03 + 0.01;
    }
    
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += velocities[i];
        
        if (posArray[i * 3 + 1] > 10) {
          posArray[i * 3] = (Math.random() - 0.5) * 30;
          posArray[i * 3 + 1] = -10;
          posArray[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#34D399"
        size={0.06}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Calculator Icon (larger)
function Calculator() {
  const calcRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (calcRef.current) {
      const time = state.clock.elapsedTime;
      calcRef.current.position.y = Math.sin(time * 0.4) * 0.5;
      calcRef.current.rotation.z = Math.sin(time * 0.25) * 0.12;
      calcRef.current.rotation.y = Math.sin(time * 0.2) * 0.15;
    }
  });

  return (
    <group ref={calcRef} position={[-8, -1, -4]}>
      <mesh>
        <boxGeometry args={[1.5, 2, 0.15]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.12} />
      </mesh>
      <mesh position={[0, 0.55, 0.08]}>
        <planeGeometry args={[1.1, 0.35]} />
        <meshBasicMaterial color="#34D399" transparent opacity={0.25} />
      </mesh>
      {[0.1, -0.2, -0.5].map((row, i) => (
        [-0.35, 0, 0.35].map((col, j) => (
          <mesh key={`${i}-${j}`} position={[col, row, 0.08]}>
            <planeGeometry args={[0.25, 0.2]} />
            <meshBasicMaterial color="#34D399" transparent opacity={0.15} />
          </mesh>
        ))
      ))}
    </group>
  );
}

// Large Perspective Grid
function FinanceGrid() {
  const gridRef = useRef<THREE.LineSegments>(null);
  
  const positions = useMemo(() => {
    const pos: number[] = [];
    const size = 40;
    const divisions = 20;
    const step = size / divisions;
    
    for (let i = -size / 2; i <= size / 2; i += step) {
      pos.push(-size / 2, -6, i - 10, size / 2, -6, i - 10);
      pos.push(i, -6, -size / 2 - 10, i, -6, size / 2 - 10);
    }
    
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = 0.6 + state.pointer.y * 0.05;
    }
  });

  return (
    <lineSegments ref={gridRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#34D399" transparent opacity={0.1} />
    </lineSegments>
  );
}

// Glowing Orbs
function GlowingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  
  const orbs = useMemo(() => [
    { position: [-6, 2, -8], scale: 3, color: '#34D399' },
    { position: [7, -1, -10], scale: 4, color: '#10B981' },
    { position: [0, 3, -12], scale: 5, color: '#6EE7B7' },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.children.forEach((orb, i) => {
        orb.position.x = orbs[i].position[0] + Math.sin(time * 0.2 + i) * 2;
        orb.position.y = orbs[i].position[1] + Math.cos(time * 0.3 + i) * 1.5;
        orb.scale.setScalar(orbs[i].scale + Math.sin(time * 0.5 + i) * 0.5);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position as [number, number, number]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.05} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroBackground() {
  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 70 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <BarChart />
        <LineChart />
        <LineChart2 />
        <PieChart />
        <FinanceCubes />
        <Documents />
        <MoneyParticles />
        <Calculator />
        <FinanceGrid />
        <GlowingOrbs />
      </Canvas>
      
      {/* Gradient Overlays - Lighter to show more animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
