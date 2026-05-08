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
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      style={{ rotateX: window.innerWidth >= 1024 ? rotateX : 0, rotateY: window.innerWidth >= 1024 ? rotateY : 0, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card flex-shrink-0 w-full lg:w-[60vw] h-auto lg:h-[78vh] glass-dark rounded-3xl border border-white/10 overflow-hidden flex flex-col lg:flex-row relative group"
    >
      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{ boxShadow: `inset 0 0 60px ${project.accent}18, 0 0 40px ${project.accent}08` }}
      />

      {/* Media Preview Area */}
      <div className={`w-full lg:w-[45%] h-56 lg:h-full bg-gradient-to-br ${project.imageGradient} relative overflow-hidden flex items-center justify-center flex-shrink-0`}>

        {/* Video Background */}
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 backdrop-blur-sm z-10 ${isHovered ? 'opacity-0' : 'opacity-100 lg:group-hover:opacity-0'}`}>
          <PlayCircle className="w-14 h-14 text-white drop-shadow-2xl" />
        </div>

        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${project.accent}44 1px, transparent 1px), linear-gradient(90deg, ${project.accent}44 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        <span className={`relative text-5xl lg:text-7xl font-heading font-bold px-6 text-center transition-all duration-700 ${isHovered ? 'opacity-20 blur-sm' : 'opacity-100'}`} style={{ color: `${project.accent}30`, transform: "translateZ(50px)" }}>
          {project.id.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Case Study Details */}
      <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.accent }} />
            <p className="text-[10px] lg:text-xs tracking-widest uppercase font-medium" style={{ color: project.accent }}>{project.tagline}</p>
          </div>
          <h4 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-5">{project.title}</h4>

          <div className="flex flex-wrap gap-2 mb-6 lg:mb-7">
            {project.techStack.map(tech => (
              <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-300">{tech}</span>
            ))}
          </div>

          <div className="space-y-4 lg:space-y-5">
            {project.details.map((detail, idx) => (
              <div key={idx} className="flex gap-3">
                <detail.icon className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-[10px] lg:text-xs font-semibold mb-0.5">{detail.label}</h5>
                  <p className="text-gray-400 text-[10px] lg:text-xs leading-relaxed">{detail.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 pt-6 border-t border-white/10">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-xs text-brand-black transition-all duration-300 hover:scale-105" style={{ backgroundColor: project.accent }}>
            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-semibold text-xs hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <GithubIcon className="w-3.5 h-3.5" /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-brand-black z-10 overflow-hidden py-10 lg:py-0">

      {/* Header */}
      <div className="px-6 lg:px-20 pt-20 pb-10">
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
          className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white"
        >
          Premium Case Studies.
        </motion.h3>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-6 lg:px-20 pb-24 lg:pb-20 pt-4 w-full lg:w-max"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <div className="hidden lg:block w-40 shrink-0" />
      </div>

    </section>
  );
};

export default Projects;
