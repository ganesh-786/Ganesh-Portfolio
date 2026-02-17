import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function App() {
  const [isHovering, setIsHovering] = useState(false);
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1419] via-[#0f1920] to-[#050c10] text-white relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 py-4 md:py-6 lg:py-8 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span className="text-[#0a1419] font-bold text-base md:text-lg">G</span>
            </div>
          </motion.div>

          <motion.nav 
            className="flex items-center gap-4 md:gap-8 lg:gap-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <a href="#" className="hidden md:block text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium tracking-wide">
              Works
            </a>
            <a href="#" className="hidden md:block text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium tracking-wide">
              About
            </a>
            <a href="#" className="hidden lg:block text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium tracking-wide">
              Contact
            </a>
            <div className="hidden sm:flex items-center gap-3 md:gap-4 md:ml-4 lg:ml-8">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 md:px-6 md:py-2.5 lg:px-8 lg:py-3 rounded-full font-medium text-xs md:text-sm hover:shadow-lg hover:shadow-cyan-500/40 transition-all">
              Connect
            </button>
          </motion.nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-20 md:py-24">
        <div className="max-w-[1600px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center">
            
            {/* Left Column - Text Content */}
            <motion.div
              className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="space-y-3 md:space-y-4">
                <motion.p 
                  className="text-cyan-400 text-xs md:text-sm font-medium tracking-[0.3em] uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Creative Technologist
                </motion.p>
                
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Ganesh
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                    Chaudhary
                  </span>
                </motion.h1>
              </div>

              <motion.p 
                className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Crafting exceptional digital experiences through innovative design 
                and cutting-edge technology solutions.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <button className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-medium hover:shadow-xl hover:shadow-cyan-500/40 transition-all">
                  View My Work
                </button>
                <button className="w-full sm:w-auto border-2 border-gray-700 text-gray-300 px-8 md:px-10 py-3 md:py-4 rounded-full font-medium hover:border-cyan-500 hover:text-cyan-400 transition-all">
                  Download CV
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 lg:gap-12 pt-6 md:pt-8 border-t border-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">8+</div>
                  <div className="text-gray-500 text-xs md:text-sm mt-1">Years Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">150+</div>
                  <div className="text-gray-500 text-xs md:text-sm mt-1">Projects Done</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">40+</div>
                  <div className="text-gray-500 text-xs md:text-sm mt-1">Happy Clients</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Professional 3D Shape */}
            <motion.div
              className="relative flex items-center justify-center order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div 
                className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]"
                style={{ perspective: '1200px' }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Outer Rotating Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(6, 182, 212, 0) 0deg, rgba(6, 182, 212, 0.4) 90deg, rgba(6, 182, 212, 0) 180deg, rgba(20, 184, 166, 0.4) 270deg, rgba(6, 182, 212, 0) 360deg)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Middle Ring */}
                <motion.div
                  className="absolute inset-6 sm:inset-8 md:inset-10 lg:inset-12 rounded-full border-2"
                  style={{
                    borderColor: 'rgba(6, 182, 212, 0.3)',
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Main 3D Shape Container */}
                <motion.div
                  className="absolute inset-12 sm:inset-14 md:inset-16 lg:inset-20"
                  style={{
                    transformStyle: 'preserve-3d',
                    rotateX,
                    rotateY,
                  }}
                >
                  {/* Back Layer - Shadow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl md:rounded-3xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(20, 184, 166, 0.2))',
                      transform: 'translateZ(-80px)',
                      filter: 'blur(20px)',
                    }}
                  />

                  {/* Middle Layer - Depth */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl md:rounded-3xl"
                    style={{
                      background: 'linear-gradient(135deg, #0e2a35 0%, #0a1f2b 100%)',
                      transform: 'translateZ(-40px)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                    }}
                  />

                  {/* Main Front Shape */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #134e5e 0%, #0a2f3d 50%, #071e29 100%)',
                      boxShadow: '0 30px 90px rgba(0, 0, 0, 0.8), inset 0 0 100px rgba(6, 182, 212, 0.1)',
                      transform: 'translateZ(0px)',
                    }}
                    animate={{
                      boxShadow: isHovering 
                        ? '0 40px 120px rgba(0, 0, 0, 0.9), inset 0 0 120px rgba(6, 182, 212, 0.2)'
                        : '0 30px 90px rgba(0, 0, 0, 0.8), inset 0 0 100px rgba(6, 182, 212, 0.1)',
                    }}
                  >
                    {/* Animated Grid Pattern */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                      }}
                    />

                    {/* Rotating Gradient Overlay */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.3) 60deg, transparent 120deg)',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Center Geometric Shape */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="relative"
                        animate={{
                          rotate: isHovering ? 360 : 0,
                          scale: isHovering ? 1.1 : 1,
                        }}
                        transition={{ duration: 2 }}
                      >
                        {/* Hexagon Shape - Responsive Size */}
                        <svg width="100%" height="100%" viewBox="0 0 200 200" className="drop-shadow-2xl w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-[200px] lg:h-[200px]">
                          <defs>
                            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
                              <stop offset="50%" style={{ stopColor: '#14b8a6', stopOpacity: 0.6 }} />
                              <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 0.8 }} />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          
                          {/* Outer Hexagon */}
                          <polygon
                            points="100,20 170,60 170,140 100,180 30,140 30,60"
                            fill="url(#hexGradient)"
                            stroke="#06b6d4"
                            strokeWidth="2"
                            filter="url(#glow)"
                            opacity="0.9"
                          />
                          
                          {/* Middle Hexagon */}
                          <polygon
                            points="100,40 150,70 150,130 100,160 50,130 50,70"
                            fill="none"
                            stroke="#14b8a6"
                            strokeWidth="2"
                            opacity="0.6"
                          />
                          
                          {/* Inner Circle */}
                          <circle
                            cx="100"
                            cy="100"
                            r="30"
                            fill="rgba(6, 182, 212, 0.3)"
                            stroke="#06b6d4"
                            strokeWidth="2"
                          />
                          
                          {/* Center Dot */}
                          <circle
                            cx="100"
                            cy="100"
                            r="8"
                            fill="#06b6d4"
                            filter="url(#glow)"
                          />
                        </svg>

                        {/* Orbiting Particles - Responsive */}
                        {[0, 1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-400"
                            style={{
                              boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
                            }}
                            animate={{
                              x: [
                                Math.cos((i * Math.PI) / 2) * 60,
                                Math.cos((i * Math.PI) / 2 + Math.PI) * 60,
                              ],
                              y: [
                                Math.sin((i * Math.PI) / 2) * 60,
                                Math.sin((i * Math.PI) / 2 + Math.PI) * 60,
                              ],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                              delay: i * 0.5,
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>

                    {/* Top Light Highlight */}
                    <div
                      className="absolute inset-0 rounded-2xl md:rounded-3xl"
                      style={{
                        background: 'radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)',
                      }}
                    />

                    {/* Bottom Shadow */}
                    <div
                      className="absolute inset-0 rounded-2xl md:rounded-3xl"
                      style={{
                        background: 'radial-gradient(circle at 70% 80%, transparent 30%, rgba(0, 0, 0, 0.6) 100%)',
                      }}
                    />

                    {/* Edge Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl md:rounded-3xl"
                      style={{
                        boxShadow: 'inset 0 0 60px rgba(6, 182, 212, 0.2)',
                      }}
                      animate={{
                        boxShadow: isHovering
                          ? 'inset 0 0 80px rgba(6, 182, 212, 0.4)'
                          : 'inset 0 0 60px rgba(6, 182, 212, 0.2)',
                      }}
                    />
                  </motion.div>

                  {/* Front Accent Layer */}
                  <motion.div
                    className="absolute inset-4 sm:inset-6 md:inset-8 rounded-xl md:rounded-2xl"
                    style={{
                      background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
                      transform: 'translateZ(40px)',
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                {/* Corner Accent Elements - Responsive */}
                <motion.div
                  className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-5 h-5 md:w-8 md:h-8 rounded-full bg-cyan-400"
                  style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.8)' }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-4 h-4 md:w-6 md:h-6 rounded-full bg-teal-400"
                  style={{ boxShadow: '0 0 30px rgba(20, 184, 166, 0.8)' }}
                  animate={{
                    y: [10, -10, 10],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />

                {/* Connecting Lines - Responsive */}
                <motion.div
                  className="absolute top-0 left-1/2 w-0.5 h-12 md:h-16 lg:h-20 bg-gradient-to-t from-cyan-400/60 to-transparent"
                  style={{ x: '-50%', y: '-100%' }}
                  animate={{
                    height: isHovering ? ['80px', '100px'] : ['60px', '80px'],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-1/2 w-0.5 h-12 md:h-16 lg:h-20 bg-gradient-to-b from-teal-400/60 to-transparent"
                  style={{ x: '-50%', y: '100%' }}
                  animate={{
                    height: isHovering ? ['80px', '100px'] : ['60px', '80px'],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="hidden md:block fixed bottom-8 left-0 right-0 px-4 md:px-8 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="text-gray-600 text-xs md:text-sm">
            © 2026 Ganesh Chaudhary. All rights reserved.
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <a href="#" className="text-gray-600 hover:text-cyan-400 text-xs md:text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-cyan-400 text-xs md:text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </motion.footer>

      {/* Scroll Indicator */}
      <motion.div 
        className="hidden lg:flex fixed bottom-32 right-8 lg:right-16 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <span className="text-gray-600 text-xs tracking-widest [writing-mode:vertical-rl] rotate-180">
          SCROLL
        </span>
        <motion.div 
          className="w-px h-16 bg-gradient-to-b from-cyan-500/50 to-transparent"
          animate={{
            scaleY: [1, 1.5, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}