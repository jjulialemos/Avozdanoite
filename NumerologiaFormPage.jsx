// src/pages/NumerologiaFormPage.jsx
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const NumerologiaFormPage = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [horaNascimento, setHoraNascimento] = useState("");

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

    resizeCanvas();
    createStars(300);
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !dataNascimento) {
      alert("Por favor, preencha nome e data de nascimento.");
      return;
    }
    navigate("/numerologia/resultado", {
      state: { nome, dataNascimento, horaNascimento },
    });
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden text-white font-unbounded">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-dourado drop-shadow-lg animate-pulse">
          ✨ Mapa Numerológico
        </h1>
        <p className="text-gray-300 italic mb-8 max-w-xl text-lg">
          Descubra os números que guiam sua alma, missão e destino. Preencha abaixo para acessar seu portal interior.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 space-y-5 bg-black/70 rounded-2xl shadow-xl border border-dourado"
        >
          <div>
            <label className="block mb-1 text-left text-sm font-medium text-dourado">
              Nome completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-dourado"
            />
          </div>
          <div>
            <label className="block mb-1 text-left text-sm font-medium text-dourado">
              Data de nascimento
            </label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-dourado"
            />
          </div>
          <div>
            <label className="block mb-1 text-left text-sm font-medium text-dourado">
              Hora de nascimento (opcional)
            </label>
            <input
              type="time"
              value={horaNascimento}
              onChange={(e) => setHoraNascimento(e.target.value)}
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-dourado"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-black bg-dourado rounded-full hover:opacity-90 transition"
          >
            Ver resultado
          </button>
        </form>
      </main>
    </div>
  );
};

export default NumerologiaFormPage;