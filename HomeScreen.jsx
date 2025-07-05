import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import CrystalBallCanvas from "../components/CrystalBallCanvas";
import moonImage from "../assets/moon-icon.png";

const HomeScreen = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);
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
    createStars(300);
    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_#0d0d1a,_#000000)] text-white font-unbounded relative overflow-hidden flex">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
      <CrystalBallCanvas />

      {/* Sidebar */}
      <aside className="w-64 bg-black/30 border-r border-gray-800 min-h-screen p-6 flex flex-col gap-6 z-10">
        <h2 className="text-xl font-bold text-dourado mb-4">Menu Sagrado</h2>
        <button className="text-left text-dourado hover:underline" onClick={() => navigate("/tarot")}>🔮 Tarot</button>
        <button className="text-left text-dourado hover:underline" onClick={() => navigate("/numerologia")}>🌙 Numerologia</button>
        <button className="text-left text-dourado hover:underline" onClick={() => navigate("/arquetipo")}>🧠 Arquétipos</button>
        <button className="text-left text-dourado hover:underline" onClick={() => navigate("/rituais")}>✨ Rituais</button>
        <div className="mt-auto">
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white">
            Sair da Plataforma ↩️
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10 relative z-10 flex flex-col items-center text-center">
        <div className="animate-fade-in mt-20">
          <h1 className="text-5xl font-bold text-dourado mb-4 animate-pulse">🌕 Bem-vinda ao Templo Digital</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10">
            Escolha um caminho sagrado e permita que os mistérios do invisível revelem o que sua alma já sabe. Acesse tarot, numerologia, arquétipos e rituais em um só lugar.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <button onClick={() => navigate("/tarot")} className="bg-dourado text-black font-semibold py-4 px-6 rounded-full shadow-md hover:scale-105 transition">🔮 Tarot Interativo</button>
            <button onClick={() => navigate("/numerologia")} className="bg-dourado text-black font-semibold py-4 px-6 rounded-full shadow-md hover:scale-105 transition">🌙 Numerologia</button>
            <button onClick={() => navigate("/arquetipo")} className="bg-dourado text-black font-semibold py-4 px-6 rounded-full shadow-md hover:scale-105 transition">🧠 Arquétipo</button>
            <button onClick={() => navigate("/rituais")} className="bg-dourado text-black font-semibold py-4 px-6 rounded-full shadow-md hover:scale-105 transition">✨ Rituais & Sombra</button>
          </div>

          {/* Tabela de planos */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-black/30 border border-gray-700 rounded-xl p-6 text-left">
              <h3 className="text-xl font-bold text-white mb-2">Plano Gratuito</h3>
              <p className="text-gray-300 mb-2">• Acesso limitado aos oráculos</p>
              <p className="text-gray-300 mb-2">• Leituras simples e básicas</p>
              <p className="text-white font-bold mt-4">R$ 0,00</p>
            </div>
            <div className="bg-black/30 border-2 border-yellow-500 rounded-xl p-6 text-left shadow-xl">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Plano Médio ✨</h3>
              <p className="text-gray-300 mb-2">• Acesso ao Tarot Interativo</p>
              <p className="text-gray-300 mb-2">• Numerologia Completa</p>
              <p className="text-gray-300 mb-2">• Arquétipo Pessoal</p>
              <p className="text-white font-bold mt-4">R$ 37,00</p>
            </div>
            <div className="bg-black/30 border border-gray-700 rounded-xl p-6 text-left">
              <h3 className="text-xl font-bold text-white mb-2">Plano Premium 🔮</h3>
              <p className="text-gray-300 mb-2">• Tudo do Plano Médio</p>
              <p className="text-gray-300 mb-2">• Rituais personalizados</p>
              <p className="text-gray-300 mb-2">• Relatórios mensais simbólicos</p>
              <p className="text-white font-bold mt-4">R$ 59,00</p>
            </div>
          </div>

          {/* Elementos visuais adicionais */}
          <div className="mt-20 flex flex-col items-center gap-6">
            <img src={moonImage} alt="Lua Cheia" className="w-24 h-24 animate-bounce" />
            <blockquote className="italic text-gray-400 max-w-xl text-lg">“O invisível fala, o sagrado guia, e sua alma se lembra.”</blockquote>
            <div className="text-sm text-gray-500">Depoimentos em breve disponíveis ✨</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
