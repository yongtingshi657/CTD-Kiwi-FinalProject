import React from 'react';
import styles from './Product.module.css';
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function Product({ product }) {

  

  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.productActions}>
          <FaTrashAlt />
          <MdEdit />
        </div>
        <img src={product.img} />
        <h3>{product.name}</h3>
        <p>Store: {product.store}</p>
        <p>Date: {product.date}</p>
        <p>Category: {product.category}</p>
        {product.note && <p className={styles.note}>note: {product.note}</p>}
      </div>
    </>
  );
}

export default Product;
