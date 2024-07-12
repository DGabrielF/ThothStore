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

  const detailArea = createDetailArea(item);  
  card.appendChild(detailArea);

  return card;
}

function createDetailArea(item) {
  const detailArea = document.createElement("div");
  detailArea.classList.add("detail_area");
  detailArea.classList.add("hide");

  const imagesArea = document.createElement("div");
  imagesArea.classList.add("images_area");
  detailArea.appendChild(imagesArea);

  const imagesMenu = document.createElement("div");
  imagesMenu.classList.add("image_menu");
  imagesArea.appendChild(imagesMenu);

  const imagesDetail = document.createElement("div");
  imagesDetail.classList.add("image_detail");
  imagesArea.appendChild(imagesDetail);

  const details = document.createElement("div");
  details.classList.add("details");
  detailArea.appendChild(details);

  const name = document.createElement("span");
  name.classList.add("name");
  name.textContent = item.name;
  details.appendChild(name);

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = item.description;
  details.appendChild(description);

  const classification = document.createElement("div");
  classification.classList.add("classification");
  details.appendChild(classification);

  const category = document.createElement("span");
  category.textContent = item.category;
  classification.appendChild(category);
  
  const arrow = document.createElement("img");
  arrow.src = "src/assets/icons/arrow.svg"
  classification.appendChild(arrow);

  const type = document.createElement("span");
  type.textContent = item.type;
  classification.appendChild(type);

  const other = document.createElement("div");
  other.classList.add("other");
  details.appendChild(other);

  const options = document.createElement("div");
  options.classList.add("options");
  other.appendChild(options);

  const availableSizes = document.createElement("div");
  availableSizes.classList.add("available_sizes");
  options.appendChild(availableSizes);

  const models = document.createElement("div");
  models.classList.add("models");
  options.appendChild(models);

  const physicalProperties = document.createElement("div");
  physicalProperties.classList.add("physical_properties");
  other.appendChild(physicalProperties);

  const height = document.createElement("span");
  height.classList.add("height");
  physicalProperties.appendChild(height);

  const width = document.createElement("span");
  width.classList.add("width");
  physicalProperties.appendChild(width);

  const depth = document.createElement("span");
  depth.classList.add("depth");
  physicalProperties.appendChild(depth);

  const weight = document.createElement("span");
  weight.classList.add("weight");
  physicalProperties.appendChild(weight);

  const volume = document.createElement("span");
  volume.classList.add("volume");
  physicalProperties.appendChild(volume);

  return detailArea;
}

function buy(event, link) {
  console.log(event.target, "comprar")
  window.open(link, "_blank");
}

function toggleDetail(event) {
  const parentCard = event.target.closest(".card");
  const detailArea = parentCard.querySelector(".detail_area")
  if (detailArea.classList.contains("hide")) {
    detailArea.classList.remove("hide");
  } else {
    detailArea.classList.add("hide");
  }
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