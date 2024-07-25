import { State } from "../../scripts/state.js";
import { Products } from "../products/products.js";

export const Menu = {
  self: document.querySelector("div.menu"),
  openButton: document.querySelector(".menu_icon"),
  closeButton: document.querySelector(".close_menu_icon"),
  load: () => {},
  toggleTypes: () => {},
}

Menu.load = () => {
  Menu.openButton.addEventListener("click", () => {
    Menu.self.classList.add("show");
    Menu.openButton.classList.add("hide");
    Menu.closeButton.classList.remove("hide");
  })
  
  Menu.closeButton.addEventListener("click", () => {
    Menu.self.classList.remove("show");
    Menu.openButton.classList.remove("hide");
    Menu.closeButton.classList.add("hide");
  })

  for (const category of State.data.categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");

    const categoryButton = document.createElement("button");
    categoryButton.textContent = category.name;
    categoryButton.addEventListener("click", e => toggleTypes(e))
    categoryDiv.appendChild(categoryButton);

    
    const typeDiv = document.createElement("div");
    typeDiv.classList.add("type");
    typeDiv.classList.add("hide");
    categoryDiv.appendChild(typeDiv);

    const separator = document.createElement("div");
    separator.classList.add("horizontal_separator");
    typeDiv.appendChild(separator)

    for (const type of State.data.types) {
      if (type.category === category.name) {
        const typeButton = document.createElement("button");
        typeButton.textContent = type.name;
        typeButton.addEventListener("click", e => filterContent(e))
        typeDiv.appendChild(typeButton);
      }
    }

    Menu.self.appendChild(categoryDiv);
  }
}

function toggleTypes(event) {
  const selectedCategory = event.target.textContent;
  const categories = Menu.self.querySelectorAll(".category");
  for (const category of categories) {
    const categoryText = category.querySelector("button").textContent;
    if (categoryText !== selectedCategory) {
      const typeToHide = category.querySelector(".type");
      if (!typeToHide.classList.contains("hide")) {
        typeToHide.classList.add("hide");
      }
    }
  }
  const parent = event.target.parentNode;
  const typeDiv = parent.querySelector(".type");
  if (typeDiv.classList.contains("hide")) {
    typeDiv.classList.remove("hide");
    State.filter.category = selectedCategory;
  } else {
    typeDiv.classList.add("hide");
    State.filter.category = null;
  }
  State.filter.type = null;
  Products.load();
}

function filterContent(event) {
  const type = event.target;
  const parent = event.target.parentNode.parentNode;
  const category = parent.querySelector("button");
  if (State.filter.type === type.textContent) {
    State.filter.type = null;
  } else {
    State.filter.type = type.textContent;
    State.filter.category = category.textContent;
    if (Menu.self.classList.contains("show")) {
      Menu.self.classList.remove("show")
      Menu.openButton.classList.remove("hide")
    }
  }
  Products.load()
}