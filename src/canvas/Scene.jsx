import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

const ParticleNetwork = () => {
  const group = useRef();
  const meshRef = useRef();
  const { mouse } = useThree();
  
  useFrame((state, delta) => {
    if (group.current) {
      // Base orbital movement
      group.current.rotation.y += delta * 0.1;
      group.current.rotation.z += delta * 0.05;

      // Mouse reactive parallax (smooth interpolation)
      const targetX = mouse.x * 0.8;
      const targetY = mouse.y * 0.8;
      
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.03);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.03);
    }

    if (meshRef.current) {
      // Pulsing effect on the core geometry
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <Sparkles 
          count={800} 
          scale={20} 
          size={2} 
          color="#10B981" 
          opacity={0.4} 
          speed={0.5} 
          noise={0.1}
        />
        
        {/* Abstract futuristic core shape */}
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[2, 2]} />
          <meshStandardMaterial 
            color="#006A4E"
            wireframe
            emissive="#10B981"
            emissiveIntensity={2}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Orbiting metallic rings */}
        {[1, 2, 3].map((i) => (
          <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <torusGeometry args={[3 + i * 0.5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.5} transparent opacity={0.2} />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

const CinematicCamera = () => {
  const cameraRef = useRef();
  
  useFrame((state) => {
    // Calculate scroll percentage
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;

    // Camera fly-through logic
    // Move camera deeper into the scene as we scroll
    const targetZ = 8 - scrollProgress * 5;
    const targetY = -scrollProgress * 2;
    const targetRotationX = -scrollProgress * 0.2;

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, targetRotationX, 0.05);
  });

  return <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />;
};

export default function Scene() {
  return (
    <>
      <CinematicCamera />
      
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#10B981" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#006A4E" />
      <spotLight position={[0, 20, 10]} angle={0.15} penumbra={1} intensity={5} color="#white" castShadow />

      <Stars radius={80} depth={40} count={3000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#0A0A0A', 10, 35]} />

      <ParticleNetwork />

      {/* High-Quality Post-Processing */}
      <EffectComposer multisampling={2} disableNormalPass>
        <Bloom 
          luminanceThreshold={0.3} 
          luminanceSmoothing={0.9} 
          intensity={1.5} 
        />
        <DepthOfField 
          focusDistance={0.01} 
          focalLength={0.1} 
          bokehScale={1.5} 
        />
        <ChromaticAberration 
          blendFunction={BlendFunction.SCREEN} 
          offset={[0.001, 0.001]} 
        />
        <Noise opacity={0.02} />
        <Vignette offset={0.2} darkness={1.0} />
      </EffectComposer>
    </>
  );
}
