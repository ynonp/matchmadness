import _ from 'lodash';

export async function getCards() {
  return _.shuffle([
    { id: 1, playCount: 0, text: "APPLE", image: "/img/apple.png" },
    { id: 2, playCount: 0, text: "HAMBURGER", image: "/img/burger.webp" },
    { id: 3, playCount: 0, text: "FRENCH FRIES", image: "/img/fries.webp" },
    { id: 4, playCount: 0, text: "JUICE", image: "/img/juice.webp" },
    { id: 5, playCount: 0, text: "LEMON", image: "/img/lemon.jpg" },
    { id: 6, playCount: 0, text: "Milkshake", image: "/img/milkshake.jpg" },
  ])
}