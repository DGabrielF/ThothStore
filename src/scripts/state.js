import { Firestore } from "./firebase/firestore.js";

export const State = {
  user: {
    auth: false
  },
  data: {
    products: [],
    types: [],
    categories: [],
  },
  filter: {
    category: null,
    type: null,
    attribute: null,
    price: null,
    ascending: null,
  },
  setData: async () => {},
}

State.setData = async () => {
  State.data.products = await Firestore.fetch("products");
  State.data.types = await Firestore.fetch("types");
  State.data.categories = await Firestore.fetch("categories");
}