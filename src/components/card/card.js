export const Card = {
  create: () => {},
}

Card.create = (item) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const name = document.createElement("span");
  name.classList.add("name");
  name.textContent = item.name;
  card.appendChild("name");

  const image = document.createElement("img");
  image.src = `src/assets/images/${item.image}.png`;
  image.alt = item.name;
  card.appendChild(image);
  
  const buttonArea = document.createElement("div");
  buttonArea.classList.add("button_area");
  card.appendChild(buttonArea);
  
  const buyButton = document.createElement("button");
  buyButton.addEventListener("click", e => buy(e));
  buyButton.textContent = "comprar";
  buttonArea.appendChild(buyButton);
  
  const detailButton = document.createElement("button");
  detailButton.addEventListener("click", e => toggleDetail(e));
  detailButton.textContent = "detalhes";
  buttonArea.appendChild(detailButton);

  return card;
}

function buy(event) {
  console.log(event.target, "comprar")
}

function toggleDetail(event) {
  console.log(event.target, "detalhes")
}