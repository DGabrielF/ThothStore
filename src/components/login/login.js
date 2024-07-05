import { FireAuth } from "../../scripts/firebase/fireauth.js";
import { Firestore } from "../../scripts/firebase/firestore.js";
import { Fade } from "../fade/fade.js";

export const Login = {
  self: document.querySelector("div.login_box"),
  load: () => {},
  open: () => {},
  close: () => {},
  enter: async () => {},
};

Login.load = () => {
  const loginButton = document.querySelector("button.login");
  loginButton.addEventListener("click", Login.open);

  const closeButton = Login.self.querySelector("button.close");
  closeButton.addEventListener("click", Login.close);

  const confirmButton = Login.self.querySelector("button.confirm");
  confirmButton.addEventListener("click", Login.enter);
}

Login.open = () => {
  Login.self.classList.remove("hide")
  Fade.self.classList.remove("hide")
}

Login.close = () => {
  Login.self.classList.add("hide")
  Fade.self.classList.add("hide")
}

Login.enter = async () => {
  const user = Login.self.querySelector("input#user").value;
  const password = Login.self.querySelector("input#password").value;

  const response = await FireAuth.signIn(user, password);
  if (typeof response === "string") {
    console.log(response)
  } else {
    console.log("fazer aparecer os icones de editar e excluir produtos e os botões de adicionar produto e de fazer logout");
    Login.close()
  }
}