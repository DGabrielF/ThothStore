export const Menu = {
  self: document.querySelector("div.menu"),
  setMenu: () => {},
  toggleTypes: () => {},
}

Menu.setMenu = (state) => {
  for (const category of state.categories) {
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

    for (const type of state.types) {
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
  const parent = event.target.parentNode;
  const typeDiv = parent.querySelector(".type");
  if (typeDiv.classList.contains("hide")) {
    typeDiv.classList.remove("hide");
  } else {
    typeDiv.classList.add("hide");
  }
}

function filterContent(event) {

}