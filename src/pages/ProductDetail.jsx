import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import Mango from '/TraderJoesMango.JPG';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';

function ProductDetail({ products, deleteProduct }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((product) => product.id === id);

  function handleEditClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      navigate(`/edit/${id}`);
    }
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      deleteProduct(product.id);
    }
  }
  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <h1>Product Not Found</h1>
        <p>The product with ID could not be located.</p>
      </div>
    );
  }
  return (
    <>
      <div className={styles.productDetail}>
        <div className={styles.productActions}>
          <MdEdit onClick={handleEditClick} />
          <FaTrashAlt onClick={handleDeleteClick} />
        </div>
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
        </div>
        
        <div className={styles.cardContent}>
          <h2>{product.name}</h2>
          <p>Store: {product.store}</p>
          <p>Date: {product.date}</p>
          <p>Category: {product.category}</p>
          {product.note && <p className={styles.note}>note: {product.note}</p>}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
