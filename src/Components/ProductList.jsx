import React from "react";
import Product from "./Product";
import styles from "./Product.module.css"


function ProductList({ products }) {
  return (
    <div className={styles.productContainer}>
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductList;
