import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stackData = {
  Frontend: {
    color: '#10B981',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'JavaScript', level: 98 },
      { name: 'TailwindCSS', level: 95 },
      { name: 'GSAP', level: 85 },
      { name: 'Three.js', level: 80 },
    ]
  },
  Backend: {
    color: '#3B82F6',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'REST APIs', level: 95 },
    ]
  },
  'AI / Tools': {
    color: '#A855F7',
    skills: [
      { name: 'OpenAI API', level: 90 },
      { name: 'Antigravity', level: 100 },
      { name: 'Cursor', level: 100 },
      { name: 'Windsurf', level: 100 },
      { name: 'GitHub Copilot', level: 95 },
    ]
  },
  Deployment: {
    color: '#F59E0B',
    skills: [
      { name: 'Vercel', level: 95 },
      { name: 'Netlify', level: 90 },
      { name: 'GitHub', level: 95 },
    ]
  }
};

const QuantumOrbit = ({ items, color }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setRotation((prev) => (prev + 0.005) % (Math.PI * 2));
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full aspect-square flex items-center justify-center pointer-events-none">
      {/* Central Quantum Core */}
      <div className="absolute w-32 h-32 rounded-full flex items-center justify-center z-10">
        <div className="absolute inset-0 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: `${color}20` }} />
        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-1000" style={{ background: `linear-gradient(135deg, ${color}, white)`, boxShadow: `0 0 40px ${color}80` }}>
           <div className="w-8 h-8 bg-brand-black rounded-full" />
        </div>
      </div>

      {/* Orbit Paths */}
      <div className="absolute w-full h-full rounded-full border border-white/5" />
      <div className="absolute w-[70%] h-[70%] rounded-full border border-white/5" />

      {/* Orbiting Tech Particles */}
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const angle = (index / items.length) * Math.PI * 2 + rotation;
          const radius = index % 2 === 0 ? '45%' : '32%';
          
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                left: `calc(50% + ${Math.cos(angle) * parseInt(radius)}%)`,
                top: `calc(50% + ${Math.sin(angle) * parseInt(radius)}%)`,
              }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 glass px-4 py-2 rounded-xl whitespace-nowrap text-[10px] font-bold tracking-widest uppercase text-white border-white/10 shadow-2xl pointer-events-auto cursor-pointer transition-all duration-500"
              style={{ '--hover-bg': color }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = color;
                e.currentTarget.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              {item.name}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const TechStack = () => {
  const [activeTab, setActiveTab] = useState('Frontend');
  const categories = Object.keys(stackData);
  const activeColor = stackData[activeTab].color;

  return (
    <section className="relative w-full min-h-screen py-24 z-10 flex items-center overflow-hidden">
      {/* Dynamic Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none transition-all duration-1000"
           style={{ background: `radial-gradient(circle at center, ${activeColor}40 0%, transparent 70%)` }} />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left: Skill Intelligence Panel */}
        <div className="space-y-12">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-bold tracking-[0.4em] uppercase mb-6 block transition-colors duration-1000"
              style={{ color: activeColor }}
            >
              Core Capabilities
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight"
            >
              Mastered <br />
              <span className="text-transparent bg-clip-text transition-all duration-1000"
                    style={{ backgroundImage: `linear-gradient(to right, ${activeColor}, white)` }}>Technologies.</span>
            </motion.h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-500 border ${
                  activeTab === category 
                    ? 'border-transparent text-black' 
                    : 'bg-white/2 border-white/5 text-gray-500 hover:text-white hover:border-white/10'
                }`}
                style={{ 
                    backgroundColor: activeTab === category ? activeColor : 'transparent',
                    boxShadow: activeTab === category ? `0 0 20px ${activeColor}40` : 'none'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Detailed Skill List */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {stackData[activeTab].skills.map((skill, i) => (
                  <div key={skill.name} className="glass p-4 rounded-2xl group border-white/5 transition-all duration-500"
                       style={{ borderColor: `${activeColor}10` }}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-white/90 group-hover:transition-colors duration-300"
                            style={{ color: 'inherit' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = activeColor}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>{skill.name}</span>
                      <span className="text-[10px] font-mono text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full shadow-lg transition-all duration-1000"
                        style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Quantum Orbit Visualization */}
        <div className="relative hidden lg:block">
           <div className="absolute inset-0 blur-[120px] rounded-full transition-all duration-1000" 
                style={{ backgroundColor: `${activeColor}10` }} />
           <QuantumOrbit items={stackData[activeTab].skills} color={activeColor} />
        </div>

      </div>
    </section>
  );
};

export default TechStack;
