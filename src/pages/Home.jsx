import React from 'react';
import Product from '../Components/Product';
import styles from './Home.module.css';

function Home({ products, deleteProduct, editProduct }) {
  return (
    <>

      <div className={styles.productContainer}>
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            deleteProduct={deleteProduct}
            editProduct={editProduct}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
