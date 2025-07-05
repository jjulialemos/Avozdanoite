import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const perguntas = [
  {
    texto: "1. Quando estou sozinha...",
    opcoes: [
      "Me conecto com forças invisíveis que nem sempre entendo",
      "Penso em tudo que ainda quero descobrir",
      "Me preocupo com quem posso proteger ou ajudar",
      "Imagino histórias de amor ou cenas de cinema"
    ]
  },
  {
    texto: "2. Quando algo dá errado...",
    opcoes: [
      "Busco um sentido oculto naquilo que está acontecendo",
      "Sinto necessidade de sair e mudar tudo",
      "Tento manter a calma e cuidar dos que estão comigo",
      "Fico emocionalmente instável, mas busco beleza para me distrair"
    ]
  },
  {
    texto: "3. Em uma conversa profunda, eu...",
    opcoes: [
      "Sinto que há algo maior nos guiando",
      "Quero entender o que motiva o outro a seguir sua jornada",
      "Acolho a dor do outro e ofereço conforto",
      "Me conecto emocionalmente e busco empatia pela arte do sentir"
    ]
  },
  {
    texto: "4. Diante de um grande desafio...",
    opcoes: [
      "Medito e silencio até encontrar uma resposta dentro",
      "Rompo limites, mesmo com medo do desconhecido",
      "Coloco a necessidade de todos acima da minha",
      "Uso minha sensibilidade e encanto para inspirar"
    ]
  },
  {
    texto: "5. Sobre relacionamentos amorosos...",
    opcoes: [
      "Vejo como conexões cármicas e transformadoras",
      "Valorizo a liberdade, mesmo dentro da relação",
      "Procuro segurança, estabilidade e entrega profunda",
      "Quero viver intensamente, com paixão e leveza"
    ]
  },
  {
    texto: "6. Quando alguém me decepciona...",
    opcoes: [
      "Reflito se essa dor tem raízes no passado ou em algo espiritual",
      "Corto laços e parto para o novo",
      "Entendo e perdoo, mesmo que doa",
      "Me fecho e espero que o outro me procure"
    ]
  },
  {
    texto: "7. Meu maior poder está em...",
    opcoes: [
      "Intuição e sabedoria invisível",
      "Coragem para recomeçar",
      "Capacidade de proteger e servir",
      "Criatividade e magnetismo pessoal"
    ]
  },
  {
    texto: "8. Sobre o futuro...",
    opcoes: [
      "Acredito que tudo já está escrito de algum modo",
      "Penso que cada escolha constrói novos caminhos",
      "Quero garantir que todos estejam bem no processo",
      "Espero que seja belo, intenso e apaixonante"
    ]
  },
  {
    texto: "9. Quando alguém precisa de mim...",
    opcoes: [
      "Escuto com profundidade e sem julgamento",
      "Estimulo a pessoa a mudar ou partir",
      "Me coloco no lugar dela e ofereço apoio concreto",
      "Ofereço carinho, beleza e encantamento"
    ]
  },
  {
    texto: "10. No silêncio da noite, eu...",
    opcoes: [
      "Me conecto com forças que não sei explicar",
      "Faço planos secretos de como transformar minha vida",
      "Penso naqueles que amo e se estão bem",
      "Escrevo, danço, canto ou choro com emoção"
    ]
  },
  {
    texto: "11. Quando olho para mim mesma...",
    opcoes: [
      "Vejo mistérios e traumas não resolvidos",
      "Vejo alguém em construção, em constante busca",
      "Vejo uma base sólida e confiável",
      "Vejo uma alma que sente tudo com intensidade"
    ]
  },
  {
    texto: "12. Minha criança interior...",
    opcoes: [
      "Ainda me guia com sinais ocultos",
      "Quer explorar o mundo, livremente",
      "Precisa de amor, segurança e cuidado",
      "Está viva e quer se expressar com arte e cor"
    ]
  }
];

const ArquetipoFormPage = () => {
  const navigate = useNavigate();
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));

  const handleSelect = (index, value) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = value;
    setRespostas(novasRespostas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (respostas.includes(null)) {
      alert("Responda todas as perguntas antes de continuar.");
      return;
    }
    navigate("/arquetipo/resultado", { state: { respostas } });
  };

  return (
    <div className="min-h-screen px-4 py-10 text-white bg-black">
      <h1 className="mb-6 text-3xl font-bold text-dourado">Descubra seu Arquétipo Oculto</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {perguntas.map((pergunta, index) => (
          <div key={index} className="p-4 border rounded-xl bg-zinc-900 border-zinc-700">
            <p className="mb-2 font-semibold">{pergunta.texto}</p>
            {pergunta.opcoes.map((opcao, i) => (
              <label key={i} className="block mb-1">
                <input
                  type="radio"
                  name={`pergunta-${index}`}
                  value={i}
                  checked={respostas[index] === i}
                  onChange={() => handleSelect(index, i)}
                  className="mr-2"
                />
                {opcao}
              </label>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="px-6 py-2 font-bold text-black transition rounded bg-dourado hover:opacity-90"
        >
          Ver Resultado
        </button>
      </form>
    </div>
  );
};

export default ArquetipoFormPage;
