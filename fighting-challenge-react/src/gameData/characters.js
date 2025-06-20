import { themes } from '../contexts/ThemeContext';

export const CHARACTERS = {
  gon: {
    name: "Gon Freecss",
    baseHp: 100,
    hpPerLevel: 10,
    baseAttack: 15,
    attackPerLevel: 2,
    image: themes.gon.image,
    imageSelected: themes.gon.imageSelected,
    abilities: [
      { name: 'Pedra (Jajanken)', damage: 25 },
      { name: 'Tesoura (Jajanken)', damage: 18 },
      { name: 'Papel (Jajanken)', damage: 12 },
    ],
    special: { name: 'Fúria Explosiva', damage: 45, cost: 2 },
    dialogues: [
        "Vou encontrar meu pai, não importa o que aconteça!",
        "Killua, vamos explorar juntos!",
        "Preciso ficar mais forte para proteger meus amigos.",
        "Você quer treinar comigo? Isso seria ótimo!"
    ]
  },
  killua: {
    name: "Killua Zoldyck",
    baseHp: 90,
    hpPerLevel: 8,
    baseAttack: 18,
    attackPerLevel: 3,
    image: themes.killua.image,
    imageSelected: themes.killua.imageSelected,
    abilities: [
      { name: 'Ataque Relâmpago', damage: 22 },
      { name: 'Palma Relâmpago', damage: 16 },
      { name: 'Godspeed (avalanche)', damage: 15 },
    ],
    special: { name: 'Godspeed (completo)', damage: 50, cost: 2 },
    dialogues: [
        "Gon, você é a luz. Às vezes, você brilha tanto que tenho que desviar o olhar.",
        "Eu não ligo para o que for preciso. Eu vou te proteger.",
        "Idiotas não são o meu tipo.",
        "Treinar? Ok, mas não pegue leve comigo."
    ]
  },
  kurapika: {
    name: "Kurapika",
    baseHp: 95,
    hpPerLevel: 9,
    baseAttack: 16,
    attackPerLevel: 2,
    image: themes.kurapika.image,
    imageSelected: themes.kurapika.imageSelected,
    abilities: [
        { name: 'Corrente Sagrada', damage: 20 },
        { name: 'Corrente do Julgamento', damage: 18 },
        { name: 'Dowsing Chain', damage: 14 },
    ],
    special: { name: 'Emperor Time', damage: 55, cost: 3 },
    dialogues: [
        "Não descansarei enquanto um único membro da Trupe Fantasma estiver vivo.",
        "Meus olhos ficam escarlates quando minhas emoções se agitam.",
        "O poder do Imperador exige um grande sacrifício.",
        "Treinar é essencial para cumprir minha vingança."
    ]
  },
  hisoka: {
    name: "Hisoka Morow",
    baseHp: 110,
    hpPerLevel: 5,
    baseAttack: 14,
    attackPerLevel: 4,
    image: themes.hisoka.image,
    imageSelected: themes.hisoka.imageSelected,
    abilities: [
      { name: 'Bungee Gum', damage: 19 },
      { name: 'Texture Surprise', damage: 15 },
      { name: 'Ataque com Cartas', damage: 17 },
    ],
    special: { name: 'Bungee Gum (Compressão)', damage: 40, cost: 2 },
    dialogues: [
        "Borracha Bungee tem as propriedades tanto da borracha quanto da goma. ♥",
        "Adoro lutar contra pessoas fortes. Você parece promissor. ♠",
        "Um brinquedo quebrado não tem graça.",
        "Hmm, treinar? Talvez isso te torne um fruto mais maduro. ♦"
    ]
  },
};