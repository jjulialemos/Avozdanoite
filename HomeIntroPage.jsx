import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CrystalBallCanvas from "../components/CrystalBallCanvas";

const HomeIntroPage = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_#0d0d1a,_#000000)] text-white font-unbounded relative overflow-hidden flex flex-col items-center justify-center px-6 pt-28 z-10">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0"
      />
      <CrystalBallCanvas />

      {/* HERO */}
      <div className="text-center z-10 mt-10">
        <h1 className="text-4xl md:text-5xl font-bold text-dourado drop-shadow-md mb-4 animate-fade-in">
          O que acontece quando o invisível começa a te responder?
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-slow">
          Bem-vinda à plataforma que transforma perguntas em portais e intuições em direção. O Voz da Noite é seu templo digital de sabedoria simbólica.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay">
          <button
            onClick={() => navigate("/cadastro")}
            className="bg-dourado text-black font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 transition"
          >
            Criar Conta Grátis
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-dourado text-dourado px-8 py-3 rounded-full hover:bg-dourado hover:text-black transition"
          >
            Já Tenho Login
          </button>
        </div>
      </div>

      {/* VALORES */}
      <section className="mt-28 max-w-5xl mx-auto text-center space-y-10">
        <h2 className="text-2xl md:text-3xl font-bold text-dourado">
          Nossos 4 Pilares Sagrados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[ 
            ["🧠", "Tecnologia com Alma", "Usamos IA para despertar, não para controlar."],
            ["🕯️", "Sabedoria Simbólica", "Cada resposta é um espelho da sua alma."],
            ["🌑", "Sigilo e Introspecção", "Aqui, o que é seu permanece sagrado."],
            ["🔮", "Intuição Ativada", "Você aprende a ouvir o que sempre esteve em você."],
          ].map(([emoji, title, desc]) => (
            <div key={title} className="bg-black/30 border border-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-dourado mb-2">{emoji} {title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANOS */}
      <section className="mt-28 max-w-4xl w-full px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-dourado mb-6">
          Escolha seu Portal de Acesso
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-700 bg-black/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-dourado mb-2">🌑 Gratuito</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• 1 tiragem por tema</li>
              <li>• Numerologia básica</li>
              <li>• 1 teste de arquétipo</li>
              <li>• Sem acesso à sombra</li>
            </ul>
            <p className="text-dourado text-3xl font-bold mt-4">R$ 0</p>
          </div>
          <div className="border border-dourado bg-black/30 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-dourado mb-2">🌟 Premium</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Tiragens ilimitadas</li>
              <li>• Numerologia completa</li>
              <li>• Acesso à sombra e mentor interno</li>
              <li>• Rituais guiados e relatórios salvos</li>
            </ul>
            <p className="text-dourado text-3xl font-bold mt-4">R$ 37/mês</p>
          </div>
          <div className="border border-purple-400 bg-purple-900/30 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple-200 mb-2">🔮 Plano Médio</h3>
            <ul className="text-purple-100 text-sm space-y-2">
              <li>• 3 tiragens por tema/mês</li>
              <li>• Numerologia intermediária</li>
              <li>• 1 ritual guiado mensal</li>
              <li>• Acesso limitado ao mentor</li>
            </ul>
            <p className="text-purple-200 text-3xl font-bold mt-4">R$ 18/mês</p>
          </div>
        </div>
      </section>

      {/* CHAMADA FINAL */}
      <div className="mt-20 text-center mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-dourado mb-4">
          Pronta para ouvir o que o invisível tem a te dizer?
        </h2>
        <p className="text-gray-300 mb-6">
          Junte-se a nós e descubra como a sabedoria ancestral pode transformar sua vida.
        </p>
        <button
          onClick={() => navigate("/cadastro")}
          className="bg-dourado text-black font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 transition"
        >
          Iniciar Jornada Oculta
        </button>
      </div>
    </div>
  );
};

export default HomeIntroPage;
