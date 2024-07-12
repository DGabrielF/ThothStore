import { FireAuth } from "../../scripts/firebase/fireauth.js";
import { State } from "../../scripts/state.js";
import { Fade } from "../fade/fade.js";

export const Login = {
  self: document.querySelector("div.login_box"),
  load: () => {},
  open: () => {},
  close: () => {},
  enter: async () => {},
};

Login.load = () => {
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'L') {
        event.preventDefault();
        Login.open();
    }
  });

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
    const editButtons = document.querySelectorAll(".card img.edit.icon");
    for (const editButton of editButtons) {
      editButton.classList.remove("hide");
    }

    const removeButtons = document.querySelectorAll(".card img.remove.icon");
    for (const removeButton of removeButtons) {
      removeButton.classList.remove("hide");
    }

    const addProductButton = document.querySelector("div.add_product");
    addProductButton.classList.remove("hide");
    
    const loginButton = document.querySelector("button.login");
    loginButton.classList.add("hide");

    State.user.auth = true;
    
    Login.close();
  }
}