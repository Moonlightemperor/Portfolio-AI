import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, PlayCircle, Layers, Activity, Server, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const projects = [
  {
    id: 1,
    title: "Quick Commerce Platform",
    tagline: "Modern instant-delivery ecosystem",
    accent: "#3b82f6",
    video: "/videos/project1.mp4",
    liveUrl: "https://blinkit-opal.vercel.app/",
    githubUrl: "https://github.com/Moonlightemperor",
    imageGradient: "from-blue-900/80 via-blue-950/60 to-black",
    techStack: ["MERN", "Razorpay", "Google OAuth", "JWT", "RBAC"],
    details: [
      { icon: Activity, label: "Problem Solved", text: "Modernized instant-delivery with secure auth and real-time order tracking." },
      { icon: Layers, label: "Features", text: "Google OAuth, Razorpay payments, real-time tracking, RBAC admin dashboard with analytics." },
      { icon: Zap, label: "Performance", text: "Optimized MongoDB aggregation pipelines to handle high-volume concurrent transactions." },
      { icon: Server, label: "Architecture", text: "Scalable REST API with validation middleware, rate limiting, and security hardening." },
    ]
  },
  {
    id: 2,
    title: "Immersive 3D Product",
    tagline: "Apple-inspired cinematic storytelling",
    accent: "#10B981",
    video: "/videos/project2.mp4",
    liveUrl: "https://new-15.netlify.app/",
    githubUrl: "https://github.com/Moonlightemperor",
    imageGradient: "from-emerald-900/80 via-emerald-950/60 to-black",
    techStack: ["Three.js", "GSAP", "React", "WebGL", "Framer Motion"],
    details: [
      { icon: Activity, label: "Problem Solved", text: "Crafting a jaw-dropping, motion-driven product showcase rivaling Apple's visual quality." },
      { icon: Layers, label: "Features", text: "Interactive 3D visualization, GSAP scroll-based transitions, cinematic lighting." },
      { icon: Zap, label: "Performance", text: "60fps rendering optimized via WebGL instancing and efficient geometry reuse." },
      { icon: Server, label: "Architecture", text: "Awwwards-inspired frontend leveraging CSS3D, custom shaders, and WebGL pipelines." },
    ]
  },
  {
    id: 3,
    title: "Entertainment Discovery",
    tagline: "Real-time dynamic content platform",
    accent: "#a855f7",
    video: "/videos/project3.mp4",
    liveUrl: "https://scsdb-eight.vercel.app/",
    githubUrl: "https://github.com/Moonlightemperor",
    imageGradient: "from-purple-900/80 via-purple-950/60 to-black",
    techStack: ["React", "Redux", "REST API", "Infinite Scroll"],
    details: [
      { icon: Activity, label: "Problem Solved", text: "Seamless, scalable discovery for thousands of movies and TV shows in real-time." },
      { icon: Layers, label: "Features", text: "Real-time API updates, infinite scrolling, trending content, ratings, and cast insights." },
      { icon: Zap, label: "Performance", text: "Virtualized rendering for infinite scroll, optimized re-renders with Redux selectors." },
      { icon: Server, label: "Architecture", text: "Redux-powered global state with memoized selectors and modern React architecture." },
    ]
  }
];

const ProjectCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ rotateX: window.innerWidth >= 1024 ? rotateX : 0, rotateY: window.innerWidth >= 1024 ? rotateY : 0, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card flex-shrink-0 w-full lg:w-[75vw] h-auto lg:h-[75vh] relative group perspective-[2000px]"
    >
      {/* 3D Bento Container */}
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 grid-rows-[auto] lg:grid-rows-3 gap-4 lg:gap-6" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        
        {/* Block 1: Main Identity */}
        <div className="lg:col-span-2 lg:row-span-2 glass-dark rounded-3xl border border-white/10 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden group/block hover:border-white/20 transition-all duration-500 shadow-xl" style={{ transform: "translateZ(20px)" }}>
           {/* Abstract Glow */}
           <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] blur-[120px] rounded-full opacity-20 transition-all duration-1000 group-hover/block:opacity-40 group-hover/block:scale-110" style={{ backgroundColor: project.accent }} />
           {/* CSS Grid Pattern */}
           <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: `linear-gradient(${project.accent}44 1px, transparent 1px), linear-gradient(90deg, ${project.accent}44 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
           
           <div className="relative z-10">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.accent }} />
               <p className="text-[10px] lg:text-xs tracking-widest uppercase font-medium" style={{ color: project.accent }}>{project.tagline}</p>
             </div>
             <h4 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4 leading-[1.1] drop-shadow-2xl">{project.title}</h4>
           </div>

           {/* Giant Background Number */}
           <span className="absolute top-4 right-8 text-[120px] lg:text-[200px] xl:text-[250px] font-heading font-bold opacity-5 pointer-events-none select-none transition-transform duration-1000 group-hover/block:scale-110" style={{ color: project.accent }}>
             {project.id.toString().padStart(2, '0')}
           </span>
        </div>

        {/* Block 2: Tech Stack */}
        <div className="lg:col-span-1 lg:row-span-2 glass-dark rounded-3xl border border-white/10 p-8 lg:p-10 flex flex-col relative overflow-hidden hover:border-white/20 transition-all duration-500 shadow-xl" style={{ transform: "translateZ(30px)" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02]" />
          <h5 className="text-gray-500 text-[10px] lg:text-xs tracking-widest uppercase mb-6 lg:mb-8 relative z-10">Core Architecture</h5>
          <div className="flex flex-col gap-3 relative z-10">
            {project.techStack.map(tech => (
              <div key={tech} className="px-5 py-3.5 bg-brand-black/50 border border-white/5 rounded-xl text-xs lg:text-sm text-gray-300 font-mono font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-default flex items-center gap-3 shadow-md">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Block 3: Details */}
        <div className="lg:col-span-2 lg:row-span-1 glass-dark rounded-3xl border border-white/10 p-8 lg:p-10 flex items-center relative overflow-hidden hover:border-white/20 transition-all duration-500 shadow-xl" style={{ transform: "translateZ(10px)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full relative z-10">
            {project.details.slice(0, 2).map((detail, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                 <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                   <detail.icon className="w-4 h-4" style={{ color: project.accent }} />
                 </div>
                 <div>
                   <h5 className="text-white text-sm font-bold mb-2">{detail.label}</h5>
                   <p className="text-gray-400 text-xs leading-relaxed">{detail.text}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 4: Actions */}
        <div className="lg:col-span-1 lg:row-span-1 glass-dark rounded-3xl border border-white/10 p-8 flex flex-col justify-center gap-4 relative overflow-hidden hover:border-white/20 transition-all duration-500 shadow-xl" style={{ transform: "translateZ(40px)" }}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm text-brand-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]" style={{ backgroundColor: project.accent }}>
            <span>Launch Platform</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm text-white bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:scale-[1.02]">
            <span>View Source Code</span>
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>

      </div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Create the deck stacking effect
      const cards = gsap.utils.toArray('.deck-card');
      
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top ${12 + (index * 4)}vh`, // Each card pins slightly lower than the last
          endTrigger: containerRef.current,
          end: `bottom bottom`,
          pin: true,
          pinSpacing: false, // Prevents pushing other elements down, causing them to overlap
          invalidateOnRefresh: true,
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative bg-brand-black z-10 py-16 lg:py-32">

      {/* Header */}
      <div className="px-6 lg:px-20 max-w-7xl mx-auto mb-16 lg:mb-24 relative z-50">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] lg:text-sm font-semibold tracking-[0.3em] text-brand-emerald uppercase mb-2"
        >
          Selected Works
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-3xl md:text-5xl lg:text-7xl font-heading font-bold text-white"
        >
          Premium Case Studies.
        </motion.h3>
      </div>

      {/* Vertical Stacking Deck */}
      <div className="flex flex-col items-center gap-16 lg:gap-[40vh] px-6 lg:px-20 w-full relative pb-[15vh]">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="deck-card w-full flex justify-center origin-top"
            style={{ zIndex: index + 10 }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Projects;
