import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig"; // ajuste o caminho se necessário
import { useNavigate } from "react-router-dom";

const RecuperarPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("E-mail de recuperação enviado com sucesso.");
      navigate("/login");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fundo text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black/40 border border-gray-700 rounded-xl shadow-xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-dourado text-2xl font-bold text-center mb-4">Recuperar Senha</h2>
        <input
          type="email"
          placeholder="Seu e-mail cadastrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-600"
          required
        />
        <button type="submit" className="w-full bg-dourado text-black py-3 rounded hover:scale-105 transition font-semibold">
          Enviar Link de Recuperação
        </button>
        <p className="text-center text-sm text-gray-400">
          Lembrou a senha? <a href="/login" className="text-dourado hover:underline">Voltar ao login</a>
        </p>
      </form>
    </div>
  );
};

export default RecuperarPage;