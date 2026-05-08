import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const tools = [
  { id: 'chatgpt', label: 'ChatGPT', desc: 'Ideation, architecture planning & content generation', color: '#10B981', angle: 0 },
  { id: 'cursor', label: 'Cursor AI', desc: 'AI-pair-programming, instant refactors & tab-completion', color: '#3b82f6', angle: 60 },
  { id: 'copilot', label: 'GitHub Copilot', desc: 'Context-aware code suggestions & documentation', color: '#a855f7', angle: 120 },
  { id: 'windsurf', label: 'Windsurf', desc: 'Agentic workflows, multi-file reasoning & debugging', color: '#f59e0b', angle: 180 },
  { id: 'openai', label: 'OpenAI API', desc: 'Embedding AI capabilities directly into products', color: '#ef4444', angle: 240 },
  { id: 'v0', label: 'v0 / Bolt', desc: 'Rapid UI prototyping and component scaffolding', color: '#06b6d4', angle: 300 },
];

const pipeline = [
  { step: '01', title: 'Ideation with AI', desc: 'ChatGPT brainstorms architecture, user flows, and feature specs at 10x speed.', icon: '💡' },
  { step: '02', title: 'Scaffold & Structure', desc: 'Cursor and Copilot generate the project skeleton, boilerplate, and config files instantly.', icon: '🏗️' },
  { step: '03', title: 'AI-Pair Programming', desc: 'Build features with Cursor\'s multi-line edits and Windsurf\'s agentic multi-file reasoning.', icon: '🤝' },
  { step: '04', title: 'Review & Refine', desc: 'AI-powered code reviews catch bugs, suggest optimizations, and improve documentation.', icon: '🔍' },
  { step: '05', title: 'Ship & Iterate', desc: 'Deploy on Vercel in seconds, gather feedback, and loop back with AI-accelerated iterations.', icon: '🚀' },
];

const NodeGraph = () => {
  const [activeNode, setActiveNode] = useState(null);
  const RADIUS = 160;
  const CENTER = 200;

  return (
    <div className="relative mx-auto origin-center transition-transform duration-500 scale-[0.7] sm:scale-[0.85] md:scale-100" style={{ width: 400, height: 400 }}>
      {/* Center core */}
      <div className="absolute z-10" style={{ left: CENTER - 40, top: CENTER - 40 }}>
        <div className="w-20 h-20 rounded-full bg-brand-emerald/20 border-2 border-brand-emerald/50 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)] backdrop-blur-md">
          <span className="text-2xl">🧠</span>
        </div>
        <div className="absolute inset-0 rounded-full border border-brand-emerald/30 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute -inset-3 rounded-full border border-brand-emerald/15 animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {tools.map((tool) => {
          const angle = (tool.angle - 90) * (Math.PI / 180);
          const nx = CENTER + RADIUS * Math.cos(angle);
          const ny = CENTER + RADIUS * Math.sin(angle);
          return (
            <line
              key={tool.id}
              x1={CENTER} y1={CENTER}
              x2={nx} y2={ny}
              stroke={tool.color}
              strokeWidth="1"
              strokeDasharray="5 5"
              opacity={activeNode === tool.id ? '0.8' : '0.25'}
              style={{ transition: 'opacity 0.3s' }}
            />
          );
        })}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      </svg>

      {tools.map((tool) => {
        const angle = (tool.angle - 90) * (Math.PI / 180);
        const nx = CENTER + RADIUS * Math.cos(angle);
        const ny = CENTER + RADIUS * Math.sin(angle);
        const isActive = activeNode === tool.id;

        return (
          <motion.button
            key={tool.id}
            className="absolute z-10 flex items-center justify-center rounded-full glass border text-xs font-semibold cursor-pointer transition-all duration-300"
            style={{
              left: nx - 36,
              top: ny - 36,
              width: 72,
              height: 72,
              borderColor: isActive ? tool.color : 'rgba(255,255,255,0.1)',
              color: isActive ? tool.color : '#9ca3af',
              boxShadow: isActive ? `0 0 20px ${tool.color}55` : 'none',
              backgroundColor: isActive ? `${tool.color}15` : 'rgba(255,255,255,0.03)',
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveNode(isActive ? null : tool.id)}
            onMouseEnter={() => setActiveNode(tool.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            {tool.label.split(' ')[0]}
          </motion.button>
        );
      })}

      {activeNode && (() => {
        const tool = tools.find(t => t.id === activeNode);
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-20 w-64 glass-dark rounded-xl px-4 py-3 z-20 text-center border shadow-2xl"
            style={{ borderColor: `${tool.color}30` }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: tool.color }}>{tool.label}</p>
            <p className="text-gray-400 text-[10px] leading-relaxed">{tool.desc}</p>
          </motion.div>
        );
      })()}
    </div>
  );
};

const AIWorkflow = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section ref={ref} className="relative w-full min-h-screen py-24 z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square rounded-full bg-brand-emerald/3 blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-sm font-semibold tracking-[0.3em] text-brand-emerald uppercase mb-4"
          >
            The Process
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6"
          >
            AI-Powered Workflow.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed"
          >
            I don't just use AI tools—I architect my entire engineering process around them, enabling 10x velocity without compromising on craftsmanship.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center order-2 lg:order-1"
          >
            <p className="text-[10px] tracking-widest text-gray-500 uppercase mb-8">AI Tools Ecosystem</p>
            <NodeGraph />
            <p className="text-[10px] text-gray-500 mt-28 md:mt-24 text-center">Tap nodes to explore each tool's role</p>
          </motion.div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
            <motion.div
              className="absolute left-5 top-0 w-px bg-gradient-to-b from-brand-emerald to-transparent hidden md:block origin-top"
              style={{ scaleY: lineScaleY, bottom: 0 }}
            />

            <div className="space-y-8 md:space-y-10">
              {pipeline.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative md:pl-16 group"
                >
                  <div className="hidden md:flex absolute left-[15px] top-1 w-5 h-5 items-center justify-center rounded-full bg-brand-graphite border border-brand-emerald/40 text-brand-emerald text-[9px] font-mono font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all duration-300">
                    {i + 1}
                  </div>

                  <div className="glass-dark rounded-2xl p-5 md:p-6 border border-white/5 hover:border-brand-emerald/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl md:text-2xl">{step.icon}</span>
                      <div>
                        <span className="text-brand-emerald font-mono text-[10px] md:text-xs">{step.step}</span>
                        <h4 className="text-white font-bold text-base md:text-lg leading-tight">{step.title}</h4>
                      </div>
                    </div>
                    <p className="text-gray-400 text-[10px] md:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 md:mt-24 pt-16 border-t border-white/5"
        >
          {[
            { value: '10x', label: 'Dev Velocity' },
            { value: '6+', label: 'AI Tools' },
            { value: '60fps', label: 'Performance' },
            { value: '∞', label: 'Iteration' },
          ].map((stat) => (
            <div key={stat.label} className="text-center glass-dark p-4 md:p-6 rounded-2xl border border-white/5">
              <div className="text-2xl md:text-4xl font-heading font-bold text-white mb-2 text-glow">{stat.value}</div>
              <div className="text-[10px] tracking-widest text-gray-500 uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIWorkflow;
