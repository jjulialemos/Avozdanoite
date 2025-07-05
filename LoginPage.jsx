import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/home"); // redireciona para o dashboard
    } catch (error) {
      setErro("Email ou senha inválidos.");
      console.error("Erro ao logar:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-fundo">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 space-y-5 border border-gray-700 shadow-xl bg-black/40 rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center text-dourado">Entrar na Voz da Noite</h2>
        
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-900 border border-gray-600 rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 bg-gray-900 border border-gray-600 rounded"
          required
        />
        {erro && <p className="text-sm text-center text-red-400">{erro}</p>}

        <button
          type="submit"
          className="w-full py-3 font-semibold text-black transition rounded bg-dourado hover:scale-105"
        >
          Entrar
        </button>

        <p className="text-sm text-center">
          <a href="/recuperar" className="text-gray-400 underline hover:text-white">Esqueceu a senha?</a>
        </p>
        <p className="text-sm text-center text-gray-400">
          Não tem conta? <a href="/cadastro" className="text-dourado hover:underline">Criar agora</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;