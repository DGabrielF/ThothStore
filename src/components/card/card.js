export const Card = {
  create: () => {},
}

Card.create = (item) => {
  const card = document.createElement("div");
  card.id = item.id;
  card.classList.add("card");

  const name = document.createElement("span");
  name.classList.add("name");
  name.textContent = item.name;
  card.appendChild(name);

  const image = document.createElement("img");
  image.src = `src/assets/images/${item.image}.png`;
  image.alt = item.name;
  card.appendChild(image);
  
  const buttonArea = document.createElement("div");
  buttonArea.classList.add("button_area");
  card.appendChild(buttonArea);
  
  const buyButton = document.createElement("button");
  buyButton.addEventListener("click", e => buy(e, item.link));
  buyButton.textContent = "comprar";
  buttonArea.appendChild(buyButton);
  
  const detailButton = document.createElement("button");
  detailButton.addEventListener("click", e => toggleDetail(e));
  detailButton.textContent = "detalhes";
  buttonArea.appendChild(detailButton);

  const detailArea = document.createElement("div");
  detailArea.classList.add("detail_area");
  card.appendChild(detailArea);

  const detail = {};

  detail.name = document.createElement("span");
  detail.name.classList.add("name");
  detail.name.textContent = item.name;

  if (item.details) {
    for (const detail in item.details) {
      // console.log(detail)
      
    }
  }
  return card;
}

function buy(event, link) {
  console.log(event.target, "comprar")
  window.open(link, "_blank");
}

function toggleDetail(event) {
  console.log(event.target, "detalhes")
}