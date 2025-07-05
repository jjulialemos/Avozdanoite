import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Funções de cálculo e dicionários omitidos para foco no layout
function reduzirNumero(numero) {
  while (numero > 9 && ![11, 22, 33].includes(numero)) {
    numero = numero.toString().split("").reduce((acc, curr) => acc + parseInt(curr), 0);
  }
  return numero;
}

function calcularCaminhoDeVida(dataNascimento) {
  const [ano, mes, dia] = dataNascimento.split("-");
  const soma = [...ano + mes + dia].reduce((acc, dig) => acc + parseInt(dig), 0);
  return reduzirNumero(soma);
}

const tabela = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

function calcularExpressao(nome) {
  const letras = nome.toUpperCase().replace(/[^A-Z]/g, "").split("");
  const soma = letras.reduce((acc, l) => acc + (tabela[l] || 0), 0);
  return reduzirNumero(soma);
}

function calcularAlma(nome) {
  const vogais = nome.toUpperCase().match(/[AEIOU]/g) || [];
  const soma = vogais.reduce((acc, v) => acc + (tabela[v] || 0), 0);
  return reduzirNumero(soma);
}

function calcularPersonalidade(nome) {
  const consoantes = nome.toUpperCase().match(/[BCDFGHJKLMNPQRSTVWXYZ]/g) || [];
  const soma = consoantes.reduce((acc, c) => acc + (tabela[c] || 0), 0);
  return reduzirNumero(soma);
}

const significados = {
  1: "Você é liderança em essência, alguém que veio para iniciar, decidir e guiar.",
  2: "A sensibilidade é seu dom. Você une, pacifica e percebe além das palavras.",
  3: "A alegria, a expressão e a comunicação são seus maiores poderes.",
  4: "Disciplina, estabilidade e estrutura: você veio para construir com base sólida.",
  5: "A liberdade pulsa em você. Movimentos, mudanças e experiências te nutrem.",
  6: "Você é guardião do lar e dos vínculos. Amor, família e beleza te rodeiam.",
  7: "O mistério e a introspecção são seu caminho. Sabedoria é sua busca.",
  8: "Você nasceu para realizar. Poder, ambição e sucesso fazem parte do seu DNA.",
  9: "Você é cura e compaixão. Um espírito antigo a serviço da humanidade.",
  11: "Número mestre da iluminação. Você canaliza o invisível com sensibilidade extrema.",
  22: "Você é arquiteto do invisível. Veio construir grandes estruturas espirituais.",
  33: "Mestre da cura. Amor incondicional é sua frequência e sua missão maior."
};

const NumerologiaResultadoPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { nome, dataNascimento } = state || {};

  if (!nome || !dataNascimento) {
    return (
      <div className="p-6 text-white bg-black min-h-screen">
        Dados insuficientes. Volte e preencha o formulário.
        <button onClick={() => navigate("/numerologia")} className="block px-4 py-2 mt-4 text-black rounded bg-dourado">Voltar</button>
      </div>
    );
  }

  const caminho = calcularCaminhoDeVida(dataNascimento);
  const expressao = calcularExpressao(nome);
  const alma = calcularAlma(nome);
  const personalidade = calcularPersonalidade(nome);

  return (
    <div
      className="min-h-screen px-6 py-10 text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/backgrounds/estrelado.png')" }}
    >
      <h1 className="mb-4 text-4xl font-bold text-center text-yellow-400">✨ Decifre os Números da Sua Alma</h1>
      <p className="mb-10 text-center italic text-gray-300 max-w-3xl mx-auto">
        Este mapa sagrado revela os quatro números centrais que moldam sua energia, seu propósito e a forma como você é percebida. Respire fundo. Leia com o coração aberto.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-yellow-300 mb-2">🌄 Caminho de Vida: {caminho}</h2>
          <p className="text-gray-200">{significados[caminho]}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-yellow-300 mb-2">🔤 Número da Expressão: {expressao}</h2>
          <p className="text-gray-200">{significados[expressao]}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-yellow-300 mb-2">💖 Número da Alma: {alma}</h2>
          <p className="text-gray-200">{significados[alma]}</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-yellow-300 mb-2">🛡️ Número da Personalidade: {personalidade}</h2>
          <p className="text-gray-200">{significados[personalidade]}</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 mt-6 font-semibold text-black transition rounded-full bg-yellow-400 hover:opacity-90"
        >
          🔙 Retornar ao Início
        </button>

        <p className="mt-6 text-sm italic text-gray-300">
          Em breve, a inteligência simbólica da <span className="text-yellow-300">Voz da Noite</span> revelará segredos ocultos de sua jornada numérica...
        </p>
      </div>
    </div>
  );
};

export default NumerologiaResultadoPage;