import { increment } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

import { Firestorage } from "../../scripts/firebase/firestorage.js";
import { Firestore } from "../../scripts/firebase/firestore.js";

export const Add = {
  self: document.querySelector(".add_area"),
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
  load: () => {}
};

Add.load = () => {
  const toggleButton = document.querySelector("div.add_product");
  toggleButton.addEventListener("click", toggleArea)

  const addButton = Add.self.querySelector("button.add_button");
  addButton.addEventListener("click", send);

  const closeButton = Add.self.querySelector("button.close");
  closeButton.addEventListener("click", toggleArea);

  addSizeCheckboxEvent();

  addPlusModelButtonEvent();
}

function addSizeCheckboxEvent() {
  const checkboxes = Add.self.querySelectorAll(".sizes input");
  for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        Add.attributes.sizes.push(event.target.name);
      } else {
        const index = Add.attributes.sizes.indexOf(event.target.name);
        if (index > -1) {
          Add.attributes.sizes.splice(index, 1);
        }
      }
    });
  }
}

function addPlusModelButtonEvent() {
  const addModelButton = Add.self.querySelector("#add_model");
  addModelButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("modelo");
    input.placeholder = "modelo";

    addModelButton.parentNode.insertBefore(input, addModelButton);
  });
}



async function send() {
  await getValues(); 

  getModelValues();

  const productData = setObjectData();
  await addProduct(productData);

  await addTypeIfNotExists(Add.attributes.type, Add.attributes.category);

  await addCategoryIfNotExists(Add.attributes.category);

  cleanEntries();

  cleanAttributes();
};

async function getValues() {
  for (const attribute in Add.attributes) {
    if (attribute === "images") {
      const productImages = Add.self.querySelector(`input.${attribute}`).files
      Add.attributes[attribute] = await Firestorage.uploadImages(productImages);
      continue;
    }
    if (attribute === "sizes" || attribute === "models") {
      continue;
    }
    Add.attributes[attribute] = Add.self.querySelector(`input.${attribute}`).value;
  }
}

function getModelValues() {
  const productModelsInputs = Add.self.querySelectorAll("input.modelo");
  for (const modelInput of productModelsInputs) {
    if (modelInput.value) {
      Add.attributes.models.push(modelInput.value);
    }
  }
}

function setObjectData() {
  const productData = {};
  for (const attribute in Add.attributes) {
    if (Add.attributes[attribute]) {
      productData[attribute] = Add.attributes[attribute];
    }
  }
  return productData;
}

async function addProduct(data) {
  const productResponse = await Firestore.create("products", data);

  if (typeof productResponse === "string") {
    console.error(productResponse);
  } else {
    console.log("Produto adicionado com sucesso!");
  }
}

async function addTypeIfNotExists(type, category) {
  const typeData = {
    name: type,
    category: category,
    count: 1
  };

  const typeResponse = await Firestore.checkIfExists("types", typeData, "name");
  if (!typeResponse) {
    Firestore.create("types", typeData);
  } else {
    if (typeof typeResponse !== "string") {
      typeResponse.forEach(async (docSnap) => {
        Firestore.update("types", docSnap.id, {
          count: increment(1),
        });
      });
    } else {
      console.error(typeResponse);
    }
  }
}

async function addCategoryIfNotExists(category) {
  const categoriesData = {
    name: category,
    count: 1
  };

  const categoriesResponse = await Firestore.checkIfExists("categories", categoriesData, "name");
  if (!categoriesResponse) {
    Firestore.create("categories", categoriesData);
  } else {
    if (typeof categoriesResponse !== "string") {
      categoriesResponse.forEach(async (docSnap) => {
        Firestore.update("categories", docSnap.id, {
          count: increment(1),
        });
      });
    } else {
      console.error(categoriesResponse);
    }
  }
}

function cleanAttributes() {
  for (const attribute in Add.attributes) {
    if (attribute == "sizes" || attribute == "models") {
      Add.attributes[attribute] = [];
      continue;
    }
    Add.attributes[attribute] = null;
  }
}

function cleanEntries() {
  const inputs = Add.self.querySelectorAll("input");
  for (const input of inputs) {
    if (input.type === "text") {
      input.value = "";
    }
    if (input.type === "checkbox") {
      input.checked = false;
    }
    if (input.type === "files") {
      input.files = [];
    }
  }
}

function toggleArea() {
  if (Add.self.classList.contains("hide")) {
    Add.self.classList.remove("hide")
  } else {
    Add.self.classList.add("hide")
  }
}