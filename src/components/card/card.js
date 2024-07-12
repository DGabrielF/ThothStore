import { Firestore } from "../../scripts/firebase/firestore.js";
import { State } from "../../scripts/state.js";
import { Edit } from "../edit/edit.js";

export const Card = {
  create: () => {},
}

Card.create = (item) => {
  if (!item.name) return;
  
  const card = document.createElement("div");
  card.id = item.id;
  card.classList.add("card");

  const name = document.createElement("span");
  name.classList.add("name");
  name.textContent = item.name;
  card.appendChild(name);

  const edit = document.createElement("img");
  edit.classList.add("edit");
  edit.classList.add("icon");
  if (!State.user.auth) {
    edit.classList.add("hide")
  }
  edit.src = "src/assets/icons/edit.svg";
  edit.alt = "editar produto";
  edit.addEventListener("click", async () => Edit.open(item))
  name.appendChild(edit);

  const remove = document.createElement("img");
  remove.classList.add("remove");
  remove.classList.add("icon");
  if (!State.user.auth) {
    remove.classList.add("hide")
  }
  remove.src = "src/assets/icons/trash.svg";
  remove.alt = "remover produto";
  remove.addEventListener("click", async () => Card.remove(item))
  name.appendChild(remove);

  if (item.images.length > 0) {
    const image = document.createElement("img");
    image.src = item.images[0];
    image.alt = item.name;
    card.appendChild(image);
  }
  
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

Card.remove = async (product) => {
  const body = document.querySelector("body");

  const div = document.createElement("div");
  div.classList.add("confirm_delete_area")
  body.appendChild(div);

  const text = document.createElement("span");
  text.textContent = `Você realmente deseja excluir ${product.name}?`;
  div.appendChild(text);

  const buttonArea = document.createElement("div");
  buttonArea.classList.add("button_area");
  div.appendChild(buttonArea);

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "SIM";
  confirmButton.disabled = false;
  confirmButton.addEventListener("click", async () => {
    confirmButton.disabled = true;
    const productResponse = await Firestore.delete("products", product.id);  
    if (typeof productResponse === "string") {
      console.error(productResponse);
      confirmButton.disabled = false;
    } else {
      console.log(productResponse);
      div.remove()
    }
  })
  buttonArea.appendChild(confirmButton);
  
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "NÃO"
  cancelButton.addEventListener("click", () => {
    div.remove()
  })
  buttonArea.appendChild(cancelButton);
}