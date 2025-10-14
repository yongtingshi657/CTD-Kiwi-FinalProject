import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ProductList from "./Components/ProductList";
import ProductForm from "./Components/ProductForm";
import Mango from "/TraderJoesMango.JPG"

function App() {
  const [products, setProducts] = useState([
    {
      id: nanoid(),
      image: Mango,
      title: "Lays Chip",
      store: "Trader Joe's",
      date: "12/12/2025",
      category: "Fruit",
      note: "this taste very good",
    },
    {
      id: nanoid(),
      image: Mango,
      title: "Ramen",
      store: "Costco",
      date: "10/12/2025",
      category: "Food",
    },
    {
      id: nanoid(),
      image: Mango,
      title: "Sweet Potato",
      store: "Aldi",
      date: "10/12/2025",
      category: "Food",
    },
  ]);

  const [categories, setCategories] = useState(["Food", "Snack"]);
  const [stores, setStores] = useState(["Walmart", "Trader Joe's"]);

  function addProduct(formData) {
    const inputDateString = formData.date;
    const [year, month, day] = inputDateString.split("-");
    const formattedDate = `${month}/${day}/${year}`;

    const newProduct = {
      id: nanoid(),
      title: formData.name,
      store: formData.store,
      date: formattedDate,
      category: formData.category,
      note: formData.note,
      image: formData.image,
    };

    const newProducts = [...products, newProduct];
    setProducts(newProducts);
  }

  return (
    <>
      <ProductList products={products} />
      <ProductForm
        addProduct={addProduct}
        categories={categories}
        setCategories={setCategories}
        stores={stores}
        setStores={setStores}
      />
    </>
  );
}

export default App;
