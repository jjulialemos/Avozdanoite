import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const arquetipos = [
  {
    nome: "A Sacerdotisa",
    descricao:
      "Você carrega uma conexão profunda com o invisível. Seus instintos são portais. Há em você uma sabedoria ancestral que sussurra no silêncio e guia quem te ouve com o coração aberto.",
  },
  {
    nome: "A Exploradora",
    descricao:
      "Sua alma é movida por descobertas e reinvenções. Você não se contenta com o óbvio, precisa romper fronteiras, buscar novos mundos, e é nesse movimento que você se encontra.",
  },
  {
    nome: "A Guardiã",
    descricao:
      "Você tem um dom de nutrir e proteger. Seu poder está em oferecer segurança, estabilidade e acolhimento. É presença firme, mesmo quando o mundo está em caos.",
  },
  {
    nome: "A Sensitiva",
    descricao:
      "Seu poder está no sentir. Você percebe o mundo através das emoções, da arte, do amor e da empatia. É um espírito criativo que transforma tudo que toca com beleza e verdade."
  }
];

const ArquetipoResultadoPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const respostas = state?.respostas;

  if (!respostas || respostas.length !== 12) {
    return (
      <div className="p-6 text-white">
        Respostas inválidas. Por favor, refaça o teste.
        <button
          onClick={() => navigate("/arquetipo")}
          className="block px-4 py-2 mt-4 text-black rounded bg-dourado"
        >
          Refazer Teste
        </button>
      </div>
    );
  }

  const pontuacao = [0, 0, 0, 0];
  respostas.forEach((indice) => {
    pontuacao[indice]++;
  });

  const indiceVencedor = pontuacao.indexOf(Math.max(...pontuacao));
  const arquetipo = arquetipos[indiceVencedor];

  return (
    <div className="min-h-screen px-6 py-10 text-white bg-black">
      <h1 className="mb-6 text-3xl font-bold text-dourado">Seu Arquétipo Oculto</h1>
      <div className="p-6 space-y-4 border rounded-xl bg-zinc-900 border-zinc-700">
        <h2 className="text-2xl font-semibold text-dourado">{arquetipo.nome}</h2>
        <p className="text-lg leading-relaxed text-zinc-300">{arquetipo.descricao}</p>
      </div>
    </div>
  );
};

export default ArquetipoResultadoPage;
