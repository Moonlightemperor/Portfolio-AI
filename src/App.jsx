import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from './canvas/Scene';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import TechStack from './sections/TechStack';
import AIWorkflow from './sections/AIWorkflow';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full h-full text-brand-light bg-brand-black">
      <div className="bg-noise" />

      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground UI Sections */}
      <div className="relative z-10 w-full">
        <Navbar />
        <Hero />
        <div id="about"><About /></div>
        <div id="tech"><TechStack /></div>
        <div id="workflow"><AIWorkflow /></div>
        <div id="projects"><Projects /></div>
        <Contact />
      </div>
    </div>
  );
}

export default App;
