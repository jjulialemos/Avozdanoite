import React, { useRef, useEffect } from "react";

const LandingPage = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createStars(count) {
      stars.current = [];
      for (let i = 0; i < count; i++) {
        stars.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let star of stars.current) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      }
    }

    function animate() {
      drawStars();
      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    createStars(200);
    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_center,_#0d0d1a,_#000000)]" />

      <header className="flex justify-between items-center px-10 py-6 z-10 relative">
        <h1 className="text-2xl text-white font-bold tracking-widest drop-shadow-md">VOZ DA NOITE</h1>
        <div className="flex gap-4">
          <a href="/login" className="border border-white text-white px-4 py-2 rounded-full text-sm hover:bg-dourado hover:text-black transition">Entrar</a>
          <a href="/cadastro" className="border border-white text-white px-4 py-2 rounded-full text-sm hover:bg-dourado hover:text-black transition">Criar Conta</a>
        </div>
      </header>

      <section className="text-center pt-32 max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-dourado drop-shadow-xl mb-4">Bem-vinda ao Voz da Noite</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          A única plataforma onde o <span className="text-white font-semibold">invisível</span> ganha voz.<br />
          Descubra o que precisa saber — não o que quer ouvir.<br />
          Oráculo simbólico, previsões mensais, testes espirituais e mais.
        </p>
        <button
          onClick={() => (window.location.href = "/cadastro")}
          className="mt-10 bg-dourado text-black font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 transition"
        >
          Iniciar Jornada Oculta
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 px-10 py-12 bg-white/5 backdrop-blur-sm text-center">
        {[
          ["🔮", "Tiragem de Tarot", "Interpretação simbólica e personalizada para cada pergunta."],
          ["🌙", "Numerologia Mística", "Descubra os segredos do seu nome e nascimento."],
          ["🧠", "Testes de Arquétipos", "Explore sua sombra e encontre seu guia interior."],
          ["📜", "Relatório Sagrado", "Receba mensalmente previsões e orientações em PDF."],
          ["✨", "Rituais Mensais", "Práticas e símbolos para alinhar corpo, mente e alma."],
        ].map(([emoji, title, desc]) => (
          <div key={title} className="bg-black/30 border border-gray-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-dourado mb-2">{emoji} {title}</h3>
            <p className="text-gray-300">{desc}</p>
          </div>
        ))}
      </section>

      <footer className="mt-20 py-10 text-center text-sm text-gray-400 bg-black/40">
        "A sabedoria do universo não grita. Ela sussurra. E só quem cala o mundo consegue escutar." — Voz da Noite
      </footer>
    </>
  );
};

export default LandingPage;