import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Download } from 'lucide-react';

const GithubIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
const LinkedinIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const TwitterIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const socials = [
  { label: 'GitHub', icon: GithubIcon, href: 'https://github.com/Moonlightemperor' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/pradyumna-kumar-16742a238/' },
  { label: 'Twitter', icon: TwitterIcon, href: '#' },
];

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, sent: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, sent: false, error: null });

    const formData = new FormData();
    formData.append("access_key", "a1c3e0d0-4840-42a3-bc1d-38ffd3f96b21");
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("message", formState.message);
    formData.append("subject", `New Portfolio Lead: ${formState.name}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ loading: false, sent: true, error: null });
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, sent: false })), 5000);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      setStatus({ loading: false, sent: false, error: "Submission failed. Please try again later." });
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 z-10">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] aspect-[1.5/1] bg-brand-emerald/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-sm font-semibold tracking-[0.3em] text-brand-emerald uppercase mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-heading text-4xl md:text-7xl font-bold text-white mb-6"
          >
            Let's Build <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald via-white to-brand-emerald bg-[length:200%] animate-[shimmer_3s_linear_infinite]">
              The Future.
            </span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto"
          >
            Open to full-time roles, freelance projects, and exciting collaborations. Let's create something extraordinary together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20">
                    <Mail className="w-5 h-5 text-brand-emerald" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Email</p>
                    <a href="mailto:pradyumnas526@gmail.com" className="text-white hover:text-brand-emerald transition-colors text-sm md:text-base">pradyumnas526@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20">
                    <MapPin className="w-5 h-5 text-brand-emerald" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Location</p>
                    <p className="text-white text-sm md:text-base">India · Open to Remote</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 mb-8 lg:mb-12">
                <div className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                <span className="text-brand-emerald text-xs font-medium uppercase tracking-tighter">Available for new opportunities</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-5">Find me on</p>
              <div className="flex gap-4 mb-8">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-3 rounded-xl glass border border-white/5 text-gray-400 hover:text-brand-emerald hover:border-brand-emerald/30 hover:bg-brand-emerald/10 transition-all duration-300 hover:scale-110"
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              <a
                href="/resume.pdf"
                download="Pradyumna_Resume.pdf"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-semibold text-xs md:text-sm hover:bg-brand-emerald hover:text-brand-black transition-all duration-300 group"
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="glass-dark rounded-3xl p-6 md:p-10 border border-white/10 space-y-6 relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-emerald/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-emerald/50 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-brand-emerald/50 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full flex items-center justify-center gap-3 py-4 bg-brand-emerald text-brand-black font-semibold rounded-xl hover:bg-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              >
                {status.loading ? (
                  <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                ) : status.sent ? (
                  <> ✓ Message Sent! </>
                ) : (
                  <> <Send className="w-4 h-4" /> Send Message </>
                )}
              </button>

              {status.error && (
                <p className="text-red-400 text-[10px] text-center mt-4 animate-bounce">{status.error}</p>
              )}
            </form>
          </motion.div>
        </div>

        <div className="mt-20 md:mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-600 gap-4">
          <p>© {new Date().getFullYear()} Pradyumna Kumar. Built with React & AI.</p>
          <p className="flex items-center gap-1.5 uppercase tracking-widest">
            Crafted with <span className="text-brand-emerald">♥</span> and Antigravity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
