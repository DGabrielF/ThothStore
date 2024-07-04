import { Menu } from "../components/menu/menu.js";
import { State } from "./state.js";

async function fetchData() {
  try {
    let response = await fetch('src/assets/database/data.json');
    
     if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    let data = await response.json();
    
    return data
  } catch (error) {
    console.error('Erro:', error);
  }
}

async function init() {
  await setStateData();

  Menu.setMenu(State);
}

init()


async function setStateData() {
  const data = await fetchData();
  State.products = data.products;
  State.types = data.types;
  State.categories = data.categories;
}
