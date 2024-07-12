import { Add } from "../components/add/add.js";
import { Edit } from "../components/edit/edit.js";
import { Login } from "../components/login/login.js";
import { Menu } from "../components/menu/menu.js";
import { Products } from "../components/products/products.js";
import { State } from "./state.js";



async function init() {
  await State.setData();

  Menu.load();
  Products.load();
  Login.load();

  Add.load();
  Edit.load();
}

await init();
