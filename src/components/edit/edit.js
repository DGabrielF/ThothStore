import { Firestorage } from "../../scripts/firebase/firestorage.js";
import { Firestore } from "../../scripts/firebase/firestore.js"

export const Edit = {
  self: document.querySelector(".edit_area"),
  productId: null,
  attributes: {
    name: null,
    type: null,
    category: null,
    link: null,
    images: null,
    description: null,
    height: null,
    width: null,
    depth: null,
    weight: null,
    volume: null,
    sizes: [],
    models: [],
  },
  load: () => {},
  open: async () => {},
}

Edit.load = async () => {
  const editButton = document.querySelector("button.edit_button");
  editButton.addEventListener("click", async () => confirm())

  const closeButton = Edit.self.querySelector("button.close");
  closeButton.addEventListener("click", () => {
    Edit.productId = null;
    toggleArea();
  });
  
  addSizeCheckboxEvent();
  
  addPlusModelButtonEvent();
}

function addSizeCheckboxEvent() {
  const checkboxes = Edit.self.querySelectorAll(".sizes input");
  for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        Edit.attributes.sizes.push(event.target.name);
      } else {
        const index = Edit.attributes.sizes.indexOf(event.target.name);
        if (index > -1) {
          Edit.attributes.sizes.splice(index, 1);
        }
      }
    });
  }
}

function addPlusModelButtonEvent() {
  const addModelButton = Edit.self.querySelector("#edit_model");
  addModelButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("modelo");
    input.placeholder = "modelo";

    addModelButton.parentNode.insertBefore(input, addModelButton);
  });
}

Edit.open = async (product) => {
  Edit.productId = product.id;

  for (const attribute in Edit.attributes) {
    Edit.attributes[attribute] = product[attribute];
    if (attribute === "images") {
      loadProductImages(product);
      continue;
    }
    if (attribute === "sizes") {
      loadProductSizes(product);
      continue;
    }
    if (attribute === "models") {
      loadProductModels(product);
      continue;
    }
    const attributeInput = Edit.self.querySelector(`input.${attribute}`);
    attributeInput.value = product[attribute] ? product[attribute] : "";
  }
  
  console.log("restringir os campos imutáveis")
  toggleArea()
  console.log(Edit.attributes)
}

function loadProductImages(product) {
  const imagesArea = Edit.self.querySelector("div.images_area");

  for (let i = 0; i < product.images.length; i++) {
    const div = document.createElement("div");
    div.classList.add("product_image_edit");

    const image = document.createElement("img");
    image.src = product.images[i];
    div.appendChild(image);

    const remove = document.createElement("img");
    remove.classList.add("icon");
    remove.src = "src/assets/icons/trash.svg";
    div.appendChild(remove);

    imagesArea.appendChild(div);
  }
}

function loadProductSizes(product) {
  const sizeCheckboxes = Edit.self.querySelectorAll(".sizes input");
  for (const checkbox of sizeCheckboxes) {
    checkbox.checked = product.sizes.includes(checkbox.name);
  }
}

function loadProductModels(product) {
  const addModelButton = Edit.self.querySelector("#add_model");
  for (let i = 0; i < product.models.length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("modelo");
    input.value = product.models[i];
    addModelButton.parentNode.insertBefore(input, addModelButton);
  }
}

async function confirm() {
  if (!Edit.productId) return;

  await getValues(); 

  getModelValues();

  const productData = setObjectData();
  const updateResponse = await Firestore.update("products", Edit.productId, productData);
  if (typeof updateResponse === "string") {
    console.log(updateResponse);
  } else {
    Edit.productId = null;
    toggleArea();
  }
}

async function getValues() {
  for (const attribute in Edit.attributes) {
    if (attribute === "images") {
      const productImages = Edit.self.querySelector(`input.${attribute}`).files
      const newImages = await Firestorage.uploadImages(productImages);
      Edit.attributes[attribute] = [...Edit.attributes[attribute], ...newImages]
      continue;
    }
    if (attribute === "sizes" || attribute === "models") {
      continue;
    }
    Edit.attributes[attribute] = Edit.self.querySelector(`input.${attribute}`).value;
  }
}

function getModelValues() {
  const productModelsInputs = Edit.self.querySelectorAll("input.modelo");
  for (const modelInput of productModelsInputs) {
    if (modelInput.value) {
      Edit.attributes.models.push(modelInput.value);
    }
  }
}

function setObjectData() {
  const productData = {};
  for (const attribute in Edit.attributes) {
    if (Edit.attributes[attribute]) {
      productData[attribute] = Edit.attributes[attribute];
    }
  }
  return productData;
}

function toggleArea() {
  if (Edit.self.classList.contains("hide")) {
    Edit.self.classList.remove("hide")
  } else {
    Edit.self.classList.add("hide")
  }
}