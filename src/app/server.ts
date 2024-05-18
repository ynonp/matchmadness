import _ from 'lodash';

export async function getCards() {
  return _.shuffle([
    { id: 1, playCount: 0, text: "Apple", image: "https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png" },
    { id: 2, playCount: 0, text: "Forest", image: "https://www.wwf.org.uk/sites/default/files/styles/hero_m/public/2023-09/RGB-digital-website-header-image-Mat%C3%A9cho-forest-1600_x_1200.png?h=08b866d1&itok=iaJJZnJo" },
    { id: 3, playCount: 0, text: "Tree", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/440px-Ash_Tree_-_geograph.org.uk_-_590710.jpg" },
    { id: 4, playCount: 0, text: "Flower", image: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  ])
}