
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle settings
    let particles: Particle[] = [];
    const numberOfParticles = Math.min(window.innerWidth / 10, 100); // Adjust based on screen size
    const particleBaseSize = Math.max(window.innerWidth / 1000, 1);
    const particleVariation = 1;

    // Create particles
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: particleBaseSize + Math.random() * particleVariation,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: 0.1 + Math.random() * 0.3
        });
      }
    };

    createParticles();

    // Animation
    const animate = () => {
      // Check if document has the dark class to determine dark mode
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      if (isDarkMode) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw and update particles
        particles.forEach((particle) => {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        });
      } else {
        // Clear canvas in light mode (no particles)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-40 pointer-events-none" />;
};

export default ParticlesBackground;
