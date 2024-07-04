export const State = {
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
  const data = await fetchData();
  State.data.products = data.products;
  State.data.types = data.types;
  State.data.categories = data.categories;
}

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