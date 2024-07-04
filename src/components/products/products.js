import { State } from "../../scripts/state.js";
import { Card } from "../card/card.js";

export const Products = {
  self: document.querySelector("div.products"),
  memory: [],
  load: () => {},
  hideAllCards: () => {},
}

Products.load = () => {
  Products.hideAllCards();

  const itemsToShow = applyFilters();
  // console.log("itemsToShow", itemsToShow)

  for (const object of itemsToShow) {
    const foundInMemory = Products.memory.find(item => item === object);
    if (foundInMemory) {
      const foundProduct = document.querySelector(`.card#${object.id}`)
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

function applyFilters() {
  // console.log("State.data.products", State.data.products) 
  return State.data.products.filter(item => {
    return Object.keys(State.filter).every(key => {
      if (State.filter[key] === null) {
        return true
      }
      return item[key] === State.filter[key]
    })
  })
}

Products.hideAllCards = () => {
  const productCards = Products.self.querySelectorAll(".card");
  for (const card of productCards) {
    card.classList.add("hide");
  }
}