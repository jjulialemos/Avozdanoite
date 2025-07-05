import React, { useEffect, useRef } from "react";

const CrystalBallCanvas = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function createParticles(count) {
      particles.current = [];
      for (let i = 0; i < count; i++) {
        particles.current.push({
          angle: Math.random() * Math.PI * 2,
          radius: 100 + Math.random() * 50,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.01 + 0.005,
          color: Math.random() > 0.5 ? "#a78bfa" : "#facc15", // roxo e dourado
        });
      }
    }

    function drawBall() {
      // Esfera central
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 120);
      gradient.addColorStop(0, "rgba(240, 228, 255, 0.9)");
      gradient.addColorStop(1, "rgba(140, 0, 255, 0.2)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    function drawParticles() {
      for (let p of particles.current) {
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.angle += p.speed;
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawParticles();
      requestAnimationFrame(animate);
    }

    createParticles(60);
    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default CrystalBallCanvas;