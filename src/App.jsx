import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
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
  where,
} from 'firebase/firestore';
import { getDateForDBFormat } from './Utils/utils';
import Layout from './shared/Layout';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import PrivateRoute from './feature/PrivateRoute';
import { useAuth } from './context/useAuth';
import Demo from './pages/Demo';
import { demoProducts } from './assets/demoProductList';

function App() {
  const [products, setProducts] = useState([]);
  const productsCollection = 'products';

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { currentUser } = useAuth();

  useEffect(() => {
    setErrorMessage(null);

    if (!currentUser || !currentUser.uid) {
      console.log('Waiting for authenticated user to run query.');
      // If the user logs out or is still loading, do nothing.
      return;
    }

    const productsQuery = query(
      collection(db, 'products'),
      orderBy('timestamp', 'desc'),
      where('ownerUid', '==', currentUser.uid)
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
  }, [currentUser]);

  async function addProduct(formData, user) {
    const formattedDate = getDateForDBFormat(formData);

    if (!user || !user.uid) {
      throw new Error(
        'Authentication Error: User must be logged in to add a product.'
      );
    }

    const ownerUid = user.uid;

    const newProduct = {
      ...formData,
      date: formattedDate,
      timestamp: serverTimestamp(),
      ownerUid: ownerUid,
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
  async function editProduct(product, user) {
    if (!user || !user.uid) {
      throw new Error(
        'Authentication Error: User must be logged in to edit a product.'
      );
    }

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

  const navigate = useNavigate()

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Demo />} />
          <Route path="login" element={<Login />} />
           <Route
              path="product/:id"
              element={
                <ProductDetail
                  products={demoProducts}
                  deleteProduct={()=> navigate('/login')}
                />
              }
            />

          <Route path="about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="home"
              element={
                <Home
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  products={products}
                  deleteProduct={deleteProduct}
                  editProduct={editProduct}
                  handleDismissError={handleDismissError}
                />
              }
            />

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
