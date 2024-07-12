export const Detail = {
  open: (item) => {},
  close: (event) => {},
  dict: {
    height: "altura",
    width: "largura",
    depth: "profundidade",
    weight: "peso",
    volume: "volume",
  }
}

Detail.open = (item) => {
  const detailArea = document.createElement("div");
  detailArea.classList.add("detail_area");

  const closeIcon = document.createElement("img");
  closeIcon.classList.add("close");
  closeIcon.classList.add("icon");
  closeIcon.src = "src/assets/icons/close.svg"
  closeIcon.addEventListener("click", Detail.close)
  detailArea.appendChild(closeIcon);

  const imagesArea = loadImageDetails(item);
  detailArea.appendChild(imagesArea);
  
  const details = loadTextDetails(item);  
  detailArea.appendChild(details);
  
  const buyButton = document.createElement("button");
  buyButton.classList.add("buy")
  buyButton.textContent = "comprar";
  buyButton.addEventListener("click", () => window.open(item.link, "_blank"));
  detailArea.appendChild(buyButton);

  return detailArea;
}

Detail.close = () => {
  const detailArea = document.querySelector(".detail_area");
  detailArea.remove()
}

function loadImageDetails(item) {
  const imagesArea = document.createElement("div");
  imagesArea.classList.add("images_area");
  
  const imagesMenu = document.createElement("div");
  imagesMenu.classList.add("image_menu");
  imagesArea.appendChild(imagesMenu);
  
  const imagesDetail = document.createElement("div");
  imagesDetail.classList.add("image_detail");
  imagesArea.appendChild(imagesDetail);
  
  for (let i = 0; i < item.images.length; i++) {    
    const menuImage = loadImageMenu(item.images[i], i)
    imagesMenu.appendChild(menuImage);
    
    const detailedImage = loadDetailedImage(item.images[i], i);
    if (i !== 0) {
      detailedImage.classList.add("hide")
    }
    imagesDetail.appendChild(detailedImage);
  }
  
  return imagesArea;
}

function loadImageMenu(src, index) {
  const image = document.createElement("img");
  image.classList.add(index);
  image.src = src;
  image.addEventListener("click", (e) => {
    updateDetailedImage(e, index);
  })
  
  return image;
}

function loadDetailedImage(src, index) {
  const image = document.createElement("img");
  image.classList.add(index);
  image.src = src;
  
  return image;
}

function updateDetailedImage(event, index) {
  const parentDetail = event.target.closest(".images_area")
  const imagesDetail = parentDetail.querySelector(".image_detail");
  const detailedImages = imagesDetail.querySelectorAll("img");
  for (const image of detailedImages) {
    if (image.classList.contains(index)) {
      image.classList.remove("hide");
    } else {
      image.classList.add("hide");
    }
  }
}

function loadTextDetails(item) {
  const details = document.createElement("div");
  details.classList.add("details");

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
  arrow.src = "src/assets/icons/arrow.svg";
  classification.appendChild(arrow);

  const type = document.createElement("span");
  type.textContent = item.type;
  classification.appendChild(type);

  const other = document.createElement("div");
  other.classList.add("other");
  details.appendChild(other);

  if (item.sizes.length > 0 || item.sizes.length > 0) {
    const options = loadOtherDetails(item);
    other.appendChild(options);
  }

  const physicalProperties = loadPhysicalDetails(item);
  other.appendChild(physicalProperties);
  return details;
}

function loadOtherDetails(item) {
  const options = document.createElement("div");
  options.classList.add("options");

  if (item.sizes.length > 0) {
  const availableSizes = document.createElement("div");
  availableSizes.classList.add("available_sizes");
  options.appendChild(availableSizes);
    for (const size of item.sizes) {
      const div = document.createElement("div");
      div.classList.add("available_size");
      div.textContent = size;
      availableSizes.appendChild(div)
    }
  }

  if (item.sizes.length > 0) {
  const models = document.createElement("div");
  models.classList.add("models");
  options.appendChild(models);
    for (const model of item.models) {
      const div = document.createElement("div");
      div.classList.add("model");
      div.textContent = model;
      models.appendChild(div)
    }
  }
  return options;
}

function loadPhysicalDetails(item) {
  const physicalProperties = document.createElement("div");
  physicalProperties.classList.add("physical_properties");

  for (const attribute in Detail.dict) {
    if (!item[attribute]) continue;

    const div = document.createElement("div");
    div.classList.add("physical_property")
    
    const text = document.createElement("span");
    text.classList.add("label")
    text.textContent = Detail.dict[attribute]
    div.appendChild(text);
    
    const value = document.createElement("span");
    value.classList.add("value")
    value.textContent = item[attribute];
    div.appendChild(value);

    physicalProperties.appendChild(div);
  }
  return physicalProperties;
}