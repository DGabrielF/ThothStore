import { Firestorage } from "../../scripts/firebase/firestorage.js";
import { Firestore } from "../../scripts/firebase/firestore.js";

export const Add = {
  self: document.querySelector(".add_area"),
  load: () => {}
};

Add.load = () => {
  const toggleButton = document.querySelector("div.add_product");
  toggleButton.addEventListener("click", toggleArea)

  const addButton = Add.self.querySelector("button.add_button");
  addButton.addEventListener("click", send);

  const closeButton = Add.self.querySelector("button.close");
  closeButton.addEventListener("click", toggleArea);
}

async function send() {
  const productName = Add.self.querySelector("input.name").value;
  const productType = Add.self.querySelector("input.type").value;
  const productCategory = Add.self.querySelector("input.category").value;
  const productLink = Add.self.querySelector("input.link").value;

  const productImages = Add.self.querySelector("input.image").files;
  const productImagesUrls = await Firestorage.uploadImages(productImages);

  const productDescription = Add.self.querySelector("input.description").value;
  const productHeight = Add.self.querySelector("input.altura").value;
  const productWidth = Add.self.querySelector("input.largura").value;
  const productDepth = Add.self.querySelector("input.profundidade").value;

  const productModelsInputs = Add.self.querySelectorAll("input.modelo");
  const productModels = [];
  for (const modelInput of productModelsInputs) {
    if (modelInput.value) {
      productModels.push(modelInput.value)
    }
  }

  const productData = {
    name: productName,
    type: productType,
    category: productCategory,
    link: productLink,
    images: productImagesUrls,
    description: productDescription,
    height: productHeight,
    width: productWidth,
    depth: productDepth,
    models: productModels
  }

  const productResponse = await Firestore.create("products", productData);

  if (typeof productResponse === "string") {
    console.error(productResponse);
  } else {
    console.log(productResponse);
  }

  const typeData = {
    name: productType,
    category: productCategory,
    count: 1
  }

  const typeResponse = await Firestore.checkIfExists("types", typeData, "name");
  if (!typeResponse) {
    Firestore.create("types", typeData)
  } else {
    if (typeof typeResponse !== "string") {
      typeResponse.forEach(async (docSnap) => {
        Firestore.update("types", docSnap.id,{
          count: increment(1),
        } )
      })
    } else {
      console.error(typeResponse)
    }
  }

  const categoriesData = {
    name: productCategory,
    count: 1
  }

  const categoriesResponse = await Firestore.checkIfExists("categories", categoriesData, "name");
  if (!typeResponse) {
    Firestore.create("categories", categoriesData)
  } else {
    if (typeof typeResponse !== "string") {
      categoriesResponse.forEach(async (docSnap) => {
        Firestore.update("categories", docSnap.id,{
          count: increment(1),
        } )
      })
    } else {
      console.error(categoriesResponse)
    }
  }  
};

function toggleArea() {
  if (Add.self.classList.contains("hide")) {
    Add.self.classList.remove("hide")
  } else {
    Add.self.classList.add("hide")
  }
}