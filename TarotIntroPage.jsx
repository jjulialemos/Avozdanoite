// src/pages/TarotIntroPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import tarologaImage from "../assets/tarologa.png";

const TarotIntroPage = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);
  const [temaSelecionado, setTemaSelecionado] = useState("");
  const navigate = useNavigate();

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
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        100,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      gradient.addColorStop(0, "#0f0f2e");
      gradient.addColorStop(1, "#000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let star of stars.current) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "white";
        ctx.fill();
        ctx.shadowBlur = 0;
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
    createStars(300);
    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const iniciarTiragem = () => {
    if (temaSelecionado) {
      navigate("/tiragem", { state: { tema: temaSelecionado } });
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden text-white font-unbounded">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <img
          src={tarologaImage}
          alt="Taróloga"
          className="w-[300px] md:w-[420px] rounded-full border-[6px] border-dourado shadow-[0_0_60px_30px_rgba(255,215,0,0.4)] z-20 mb-10 animate-fade-in-slow"
        />
        <h1 className="mb-4 text-5xl md:text-6xl font-extrabold text-dourado drop-shadow-md animate-pulse">
          🔮 Tiragem de Tarot Sagrado
        </h1>
        <p className="text-gray-300 italic mb-8 max-w-2xl text-lg md:text-xl leading-relaxed">
          Feche os olhos. Permita que a energia do universo envolva seu ser. Aqui, o sagrado encontra o invisível.
        </p>
        <p className="text-white mb-4 text-lg font-medium">Qual área deseja consultar?</p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {["Amor", "Trabalho", "Futuro", "Espiritualidade"].map((tema) => (
            <button
              key={tema}
              onClick={() => setTemaSelecionado(tema)}
              className={`px-5 py-2 rounded-full border border-dourado text-dourado hover:bg-dourado hover:text-black transition ${
                temaSelecionado === tema ? "bg-dourado text-black" : ""
              }`}
            >
              {tema}
            </button>
          ))}
        </div>
        {temaSelecionado && (
          <button
            onClick={iniciarTiragem}
            className="px-8 py-3 rounded-full bg-dourado text-black text-lg font-bold shadow-md hover:scale-105 transition animate-fade-in"
          >
            Iniciar Tiragem
          </button>
        )}
      </main>
    </div>
  );
};

export default TarotIntroPage;