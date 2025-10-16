import { useEffect, useState } from 'react';
import './App.css';
import ProductList from './Components/ProductList';
import ProductForm from './Components/ProductForm';
import { db } from '../firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';

function App() {
  const [products, setProducts] = useState([]);
  const productsCollection = 'products';

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (querySnapshot) => {
        const productsArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productsArray);
      },

      (error) => {
        console.error('Error fetching real-time data: ', error);
      }
    );
    return () => unsubscribe();
  }, [db]);

  console.log(products);

  const [categories, setCategories] = useState(['Food', 'Snack']);
  const [stores, setStores] = useState(['Walmart', "Trader Joe's"]);

  async function addProduct(formData) {
    const inputDateString = formData.date;
    const [year, month, day] = inputDateString.split('-');
    const formattedDate = `${month}/${day}/${year}`;

    const newProduct = {
      ...formData,
      date: formattedDate,
      timestamp: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(
        collection(db, productsCollection),
        newProduct
      );
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
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
