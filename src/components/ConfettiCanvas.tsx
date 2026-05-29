import React, { useEffect, useRef } from 'react';

interface ConfettiCanvasProps {
  active: boolean;
  colorTheme?: string; // Dominant tone to match the landing page theme
}

export const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({ active, colorTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Handcrafted premium color palette complementing the secondary page accents
    const colors = [
      colorTheme || '#3B82F6', // Primary theme color secondary accent (or default bright blue)
      '#A78BFA', // Purple
      '#EF4444', // Coral Red
      '#F59E0B', // Gold/Amber
      '#10B981', // Vivid Emerald
      '#EC4899', // Rich Hot Pink
      '#14B8A6', // High-contrast Turquoise
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      wobble: number;
      wobbleSpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = 130;

    // Seed beautiful fountain-like bursts of custom shaped paper confetti pieces
    for (let i = 0; i < particleCount; i++) {
      const mode = i % 3;
      let startX = width / 2;
      let startY = height - 10;
      let angle = -Math.PI / 2; // Straight vertical default

      if (mode === 0) {
        // Burst upward-right from bottom-left corner
        startX = width * 0.1;
        angle = -Math.PI / 4 - (Math.random() * Math.PI) / 8;
      } else if (mode === 1) {
        // Burst upward-left from bottom-right corner
        startX = width * 0.9;
        angle = -Math.PI * 0.75 + (Math.random() * Math.PI) / 8;
      } else {
        // High-launch center spread
        startX = width / 2;
        angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
      }

      // Symmetrize beautiful velocities ranging from snappy launches to gentle drifts
      const launchForce = 9 + Math.random() * 14;

      particles.push({
        x: startX,
        y: startY,
        size: 6 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.cos(angle) * launchForce,
        speedY: Math.sin(angle) * launchForce,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1.0,
        wobble: Math.random() * 8,
        wobbleSpeed: 0.04 + Math.random() * 0.06,
      });
    }

    const gravity = 0.28;
    const dragCoeff = 0.982;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      let anyLeft = false;

      particles.forEach((p) => {
        // Apply wind resistance/drag + downwards gravity pull
        p.speedX *= dragCoeff;
        p.speedY += gravity;
        p.speedY *= dragCoeff;

        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        // Gentle fade-out as particles descend
        if (p.speedY > 1.5) {
          p.opacity -= 0.012;
        }

        if (p.opacity > 0 && p.y < height + 40 && p.x > -50 && p.x < width + 50) {
          anyLeft = true;
          
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          // Draw varying types of paper shreds (rectangles, diamonds)
          const w = p.size * Math.sin(p.wobble);
          const h = p.size;
          
          if (p.size > 11) {
            // Draw diamond shape
            ctx.beginPath();
            ctx.moveTo(0, -h / 2);
            ctx.lineTo(w / 2, 0);
            ctx.lineTo(0, h / 2);
            ctx.lineTo(-w / 2, 0);
            ctx.closePath();
            ctx.fill();
          } else {
            // Standard rect
            ctx.fillRect(-w / 2, -h / 2, w, h);
          }
          ctx.restore();
        }
      });

      if (anyLeft) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, colorTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-25"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
