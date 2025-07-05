import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import tarotCards from "../data/tarotCards.json";
import cardBack from "../assets/card-back.png";
import Sidebar from "../components/Sidebar";

const imagens = import.meta.glob("../assets/cartas/*.png", { eager: true });

const getImagemCarta = (nomeCarta) => {
  const nomeFormatado = nomeCarta
    .normalize("NFD")
    .replace(/[\u0300-\u036f\s]/g, "");
  const caminhoRelativo = `../assets/cartas/${nomeFormatado}.png`;
  return imagens[caminhoRelativo]?.default || cardBack;
};

const TarotTiragemPage = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);
  const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
  const [cartasReveladas, setCartasReveladas] = useState([]);
  const [interpretacaoFinal, setInterpretacaoFinal] = useState("");
  const location = useLocation();
  const tema = location.state?.tema || "geral";

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

  useEffect(() => {
    const copia = [...tarotCards];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    const selecionadas = copia.slice(0, 7);
    setCartasSelecionadas(selecionadas);
    setCartasReveladas(Array(7).fill(false));
    setInterpretacaoFinal("");
  }, []);

  useEffect(() => {
    if (cartasReveladas.every(Boolean)) {
      const significados = cartasSelecionadas.map(
        (carta) => carta[tema.toLowerCase()] || carta.significado
      );

      const textoFinal =
        "🔮 A Voz da Noite revela: " +
        significados
          .map((s, i) => `(${i + 1}) ${s}`)
          .join(" ") +
        " Confie na jornada revelada pelas cartas.";

      setInterpretacaoFinal(textoFinal);
    }
  }, [cartasReveladas]);

  const revelarCarta = (index) => {
    const novas = [...cartasReveladas];
    novas[index] = true;
    setCartasReveladas(novas);
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden text-white font-unbounded">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      <Sidebar />
      <main className="flex-1 flex flex-col items-center text-center px-4 pt-10 pb-40">
        <h1 className="text-4xl md:text-5xl font-bold text-dourado mb-6 animate-fade-in">
          🌟 Concentre-se e revele as cartas
        </h1>
        <p className="text-gray-300 italic mb-10 text-lg max-w-xl animate-fade-in">
          Respire fundo. Quando estiver pronta, toque em cada carta para revelar seu destino.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 perspective">
          {cartasSelecionadas.map((carta, index) => (
            <div
              key={index}
              onClick={() => revelarCarta(index)}
              className="group relative w-[150px] h-[230px] mx-auto transition-transform duration-700 [transform-style:preserve-3d]"
              style={{
                transform: cartasReveladas[index]
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
              }}
            >
              <div className="absolute w-full h-full backface-hidden rounded-lg shadow-xl">
                <img
                  src={cardBack}
                  alt="Verso"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {cartasReveladas[index] && (
                <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-lg shadow-xl bg-black/70 p-2 flex flex-col justify-center">
                  <img
                    src={getImagemCarta(carta.nome)}
                    alt={carta.nome}
                    className="w-full h-[140px] object-contain rounded mb-2"
                  />
                  <div className="text-xs mt-1">
                    <p className="text-dourado font-bold text-center">{carta.nome}</p>
                    <p className="text-gray-400 mt-1">
                      <span className="text-white font-semibold capitalize">{tema}:</span>{" "}
                      {carta[tema.toLowerCase()] || carta.significado}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {interpretacaoFinal && (
          <div className="mt-14 max-w-3xl text-sm text-gray-300 border-t border-dourado pt-8 animate-fade-in">
            <h2 className="text-xl font-bold text-dourado mb-4">✨ Interpretação Final</h2>
            <p className="italic leading-relaxed">{interpretacaoFinal}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TarotTiragemPage;