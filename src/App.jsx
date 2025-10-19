import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Home from './pages/Home';
import ProductForm from './pages/ProductForm';
import { db } from '../firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getDateForDBFormat } from './utils';
import Layout from './shared/Layout';
import ProductDetail from './pages/ProductDetail';

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
  }, []);

  const [categories, setCategories] = useState(['Food', 'Snack', 'Drink']);
  const [stores, setStores] = useState(['Walmart', "Trader Joe's", 'Costco']);

  async function addProduct(formData) {
    const formattedDate = getDateForDBFormat(formData);

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

  async function deleteProduct(id) {
    try {
      await deleteDoc(doc(db, productsCollection, id));
      console.log(`Successfully deleted document with ID: ${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  // update products
  async function editProduct(product) {
    try {
      const updateProdcut = doc(db, productsCollection, product.id);
      await updateDoc(updateProdcut, {
        ...product,
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Home products={products} deleteProduct={deleteProduct} />}
          />
          <Route
            path="add"
            element={
              <ProductForm
                addProduct={addProduct}
                mode="add"
                categories={categories}
                setCategories={setCategories}
                stores={stores}
                setStores={setStores}
                products={products}
              />
            }
          />
          <Route
            path="edit/:id"
            element={
              <ProductForm
                products={products}
                mode="edit"
                editProduct={editProduct}
                categories={categories}
                setCategories={setCategories}
                stores={stores}
                setStores={setStores}
              />
            }
          />
          <Route path="product/:id" element={<ProductDetail products={products}deleteProduct={deleteProduct}/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
