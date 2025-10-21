import styles from './ProductCard.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import defaultImage from '../assets/defaultImage.png';
import { Link, useNavigate } from 'react-router-dom';

function ProductCard({ product, deleteProduct }) {
  const detailLink = `/product/${product.id}`;
  const navigate = useNavigate();

  function handleEditClick(e) {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/edit/${product.id}`);
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation();

    deleteProduct(product.id);
  }

  return (
    <>
      <Link to={detailLink} className={styles.productCardLink}>
        <div className={styles.productCard}>
          <div className={styles.imageContainer}>
            {product.img ? (
              <img
                src={product.img}
                className={styles.productImage}
                alt={product.name}
              />
            ) : (
              <img src={defaultImage} className={styles.productImage} />
            )}
            <div className={styles.productActions}>
              <MdEdit onClick={handleEditClick} />
              <FaTrashAlt onClick={handleDeleteClick} />
            </div>
          </div>
          <div className={styles.cardContent}>
            <h3>{product.name}</h3>
            <p>Store: {product.store}</p>
            <p>Category: {product.category}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;
