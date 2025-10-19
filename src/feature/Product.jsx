import styles from './Product.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import Mango from '/TraderJoesMango.JPG';
import { Link } from 'react-router-dom';

function Product({ product, deleteProduct}) {
  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.imageContainer}>
          {product.img ? (
            <img
              src={product.img}
              className={styles.productImage}
              alt={product.name}
            />
          ) : (
            <img src={Mango} className={styles.productImage} />
          )}
          <div className={styles.productActions}>
            <Link to={`/edit/${product.id}`}>
              <MdEdit />
            </Link>
            <FaTrashAlt onClick={() => deleteProduct(product.id)} />
          </div>
        </div>
        <div className={styles.cardContent}>
          {' '}
          <h3>{product.name}</h3>
          <p>Store: {product.store}</p>
          <p>Date: {product.date}</p>
          <p>Category: {product.category}</p>
          {product.note && <p className={styles.note}>note: {product.note}</p>}
        </div>{' '}
      </div>
    </>
  );
}

export default Product;
