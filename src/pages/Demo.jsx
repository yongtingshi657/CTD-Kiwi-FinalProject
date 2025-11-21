import { useEffect, useState } from 'react';
import { demoProducts } from '../assets/demoProductList';
import Home from './Home';
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Demo() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [products, setProducts] = useState([]);


  useEffect(() => {
    if (currentUser) {
      navigate('/home', { replace: true });
      return;
    }

    setProducts(demoProducts)
  }, [currentUser, navigate]);

  return (
    <>
      <h2 className='loginHeading'>This is a demo page, <span onClick={()=> navigate('/login')} >Log in</span> to enjoy the full functionality</h2>
      <Home
        //   isLoading={isLoading}
        //   errorMessage={errorMessage}
        //  handleDismissError={handleDismissError}
        products={products}
        deleteProduct={() => navigate('/login')}
        editProduct={() => navigate('/login')}
        linkPath = 'demoproduct'
      />
    </>
  );
}
