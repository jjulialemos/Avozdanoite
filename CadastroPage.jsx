import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const CadastroPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigate("/home");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      setErro("Erro ao criar conta. Verifique os dados.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-fundo">
      <form onSubmit={handleCadastro} className="w-full max-w-md p-8 space-y-5 border border-gray-700 shadow-xl bg-black/40 rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center text-dourado">Criar Conta na Voz da Noite</h2>
        
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

        {erro && <p className="text-sm text-center text-red-500">{erro}</p>}

        <button type="submit" className="w-full py-3 font-semibold text-black transition rounded bg-dourado hover:scale-105">
          Criar Conta
        </button>

        <p className="text-sm text-center text-gray-400">
          Já tem conta? <a href="/login" className="text-dourado hover:underline">Entrar</a>
        </p>
      </form>
    </div>
  );
};

export default CadastroPage;