import { Card } from "../card/card.js";

export const Products = {
  self: document.querySelector("div.products"),
  memory: [],
  load: () => {},
}

Products.load = (objects) => {
  const productCards = Products.self.querySelectorAll(".card")
  for (const object of objects) {
    const foundInMemory = Products.memory.find(item => item === object);
    if (foundInMemory) {
      const foundProduct = productCards.find(card => card.id === object.id)
      if (foundProduct) {
        if (foundProduct.classList.contains("hide")) {
          foundProduct.classList.remove("hide")
        }
      } else {
        Products.self.appendChild(Card.create(object));
      }      
    } else {
      Products.memory.push(object);
      Products.self.appendChild(Card.create(object));
    }
  }
}