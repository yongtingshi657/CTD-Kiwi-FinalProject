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
  orderBy,
  query,
} from 'firebase/firestore';
import { getDateForDBFormat } from './Utils/utils';
import Layout from './shared/Layout';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import PrivateRoute from './feature/PrivateRoute';

function App() {
  const [products, setProducts] = useState([]);
  const productsCollection = 'products';

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage(null);

    const productsQuery = query(
      collection(db, 'products'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(
      productsQuery,
      (querySnapshot) => {
        const productsArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setErrorMessage(null);
        setProducts(productsArray);
        setIsLoading(false);
      },

      (error) => {
        console.error('Error fetching real-time data: ', error);
        setErrorMessage(`Error fetching real-time data - ${error.message}`);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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

      return {
        success: true,
        id: docRef.id,
        message: 'Product added successfully!',
      };
    } catch (error) {
      const errorMessage =
        error.message || 'Firebase failed to save the product.';
      console.error('Firebase addProduct Error:', error);
      throw new Error(`Failed to save product - ${errorMessage}`);
    }
  }

  async function deleteProduct(id) {
    const isConfirmed = window.confirm(
      'Are you sure you want to permanently delete this product?'
    );
    if (!isConfirmed) {
      console.log('Deletion cancelled by user.');
      return;
    }
    try {
      await deleteDoc(doc(db, productsCollection, id));
      console.log(`Successfully deleted document with ID: ${id}`);
    } catch (error) {
      setErrorMessage(`Error deleting document: ${error.message}`);
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
      const errorMessage =
        error.message || 'Firebase failed to save the product';
      console.error('Firebase editProduct Error:', error);
      throw new Error(`Error updating document - ${errorMessage}`);
    }
  }

  const handleDismissError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route
              index
              element={
                <Home
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  products={products}
                  deleteProduct={deleteProduct}
                  handleDismissError={handleDismissError}
                />
              }
            />

            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="add"
              element={
                <ProductForm
                  addProduct={addProduct}
                  mode="add"
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
                />
              }
            />
            <Route
              path="product/:id"
              element={
                <ProductDetail
                  products={products}
                  deleteProduct={deleteProduct}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
