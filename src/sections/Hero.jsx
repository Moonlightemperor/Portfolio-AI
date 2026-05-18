import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Download, ArrowRight } from 'lucide-react';

const Hero = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Only animate the badge and heading - let the buttons stay visible by default
    tl.from('.hero-badge', { y: 20, opacity: 0, duration: 1, delay: 0.5 })
      .from('.hero-word', {
        y: 60,
        opacity: 0,
        rotationX: -45,
        stagger: 0.05,
        duration: 1.2,
      }, '-=0.5');

  }, { scope: container });

  const headingText = "Building AI-powered digital experiences that feel alive.";
  const words = headingText.split(" ");

  return (
    <section
      ref={container}
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden z-10"
    >
      <div className="max-w-6xl mx-auto px-6 text-center mt-10 md:mt-20 flex flex-col items-center relative z-20">

        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#121212] mb-8 shadow-xl">
          <div className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
          <span className="text-white text-xs font-medium tracking-widest uppercase">Creative Developer & AI Engineer</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-10 text-white drop-shadow-2xl perspective-[1000px]">
          {words.map((word, i) => (
            <span
              key={i}
              className={`hero-word inline-block origin-bottom ${word === 'alive.' ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-white italic' : ''}`}
              style={{ marginRight: '0.3em' }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* CTA Buttons - */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 opacity-100">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-emerald text-brand-black font-semibold rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            View Selected Works
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="/resume.pdf"
            download="Pradyumna_Resume.pdf"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] border border-white/20 text-white font-semibold rounded-full hover:bg-white hover:text-brand-black transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <Download size={18} />
            Download Resume
          </a>
        </div>

        {/* Social Links - Solid and Fixed */}
        <div className="flex items-center gap-6 opacity-100">
          {[
            {
              label: 'GitHub',
              href: 'https://github.com/Moonlightemperor',
              icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/pradyumna-kumar-16742a238/',
              icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            },
            {
              label: 'Twitter',
              href: '#',
              icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            },
          ].map((Social, index) => (
            <a
              key={index}
              href={Social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#121212] border border-white/10 text-gray-400 hover:text-brand-emerald transition-all duration-300 shadow-lg"
            >
              <Social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-100">
        <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-bold">Scroll to explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-emerald/60 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
