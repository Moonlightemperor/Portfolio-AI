import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Cpu, Database, Zap, Server, Layers, Workflow, CheckCircle } from 'lucide-react';

const skills = [
  { name: 'React & Next.js', icon: Code, desc: 'Building high-performance, dynamic user interfaces and SSR applications.' },
  { name: 'TypeScript', icon: CheckCircle, desc: 'Ensuring type safety, scalable architecture, and maintainable codebases.' },
  { name: 'Node.js & MongoDB', icon: Database, desc: 'Architecting robust MERN stack backends and scalable data structures.' },
  { name: 'AI-Assisted Workflows', icon: Cpu, desc: 'Leveraging LLMs and generative AI to accelerate development and product features.' },
  { name: 'API Integrations', icon: Server, desc: 'Seamlessly connecting third-party services and microservices.' },
  { name: 'Performance Optimization', icon: Zap, desc: 'Achieving 60fps animations and perfect Lighthouse scores.' },
];

const timeline = [
  {
    year: 'Philosophy',
    title: 'The Engineering Mindset',
    content: 'I believe in bridging the gap between high-end visual aesthetics and robust technical architecture. Every line of code should serve the user experience.',
  },
  {
    year: 'AI Integration',
    title: 'Supercharged Workflows',
    content: 'By integrating AI tools into my daily workflow, I iterate faster, debug smarter, and build complex features in a fraction of the traditional time, without compromising quality.',
  },
  {
    year: 'Stack',
    title: 'MERN & Beyond',
    content: 'Specializing in the MERN stack (MongoDB, Express, React, Node.js), augmented with Next.js and TypeScript for enterprise-grade product development.',
  }
];

// Reusable Spotlight Card Component
const SpotlightCard = ({ children, className = '' }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl glass-dark border border-white/10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineScale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-32 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-widest text-brand-emerald uppercase mb-4"
          >
            Behind the Code
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white"
          >
            Immersive Engineering.
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Animated Timeline (Left Column) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
            <motion.div 
              className="absolute left-6 top-0 bottom-0 w-px bg-brand-emerald hidden md:block origin-top"
              style={{ scaleY: lineScale }}
            />

            <div className="flex flex-col gap-12">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative md:pl-16"
                >
                  <div className="hidden md:flex absolute left-[19px] top-2 w-3 h-3 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                  <span className="text-brand-emerald font-mono text-sm mb-2 block">{item.year}</span>
                  <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-gray-400 font-light leading-relaxed">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Visualization (Right Column) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SpotlightCard className="p-6 h-full flex flex-col group cursor-default">
                    <div className="p-3 bg-brand-emerald/10 rounded-lg w-fit mb-4 group-hover:bg-brand-emerald/20 transition-colors">
                      <skill.icon className="text-brand-emerald w-6 h-6" />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-2">{skill.name}</h5>
                    <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                      {skill.desc}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
