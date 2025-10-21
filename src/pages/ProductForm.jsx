import { useEffect, useState } from 'react';
import styles from './ProductForm.module.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getTodayDate,
  getDateFormatForForm,
  formValidation,
} from '../Utils/utils';
import NewSelection from '../shared/NewSelection';
import { useNewSelection } from '../Utils/useNewSelection';
import ErrorContainer from '../shared/ErrorContainer';
import SuccessContainer from '../shared/SuccessContainer';

const ProductForm = ({
  addProduct,
  categories,
  setCategories,
  stores,
  setStores,
  products,
  mode,
  editProduct,
}) => {
  // update
  const { id } = useParams();
  const productToEdit = products.find((product) => product.id === id);

  const navigate = useNavigate();

  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const defaultNewProductData = {
    name: '',
    date: getTodayDate(),
    category: '',
    store: '',
    note: '',
  };

  const [formData, setFormData] = useState(() => {
    if (mode === 'edit' && productToEdit) {
      return {
        ...productToEdit,
        date: getDateFormatForForm(productToEdit.date),
      };
    } else {
      return defaultNewProductData;
    }
  });

  const [file, setFile] = useState('');
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPercentage(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.error('Firebase Storage Upload Error:', error);
          alert(`Image upload failed: ${error.message}`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formValidationResult = formValidation(formData);

    if (formValidationResult.length > 0) {
      alert(
        `Please fill in the following required fields: \n\n- ${formValidationResult.join(
          '\n- '
        )}`
      );
      return;
    }

    setFormError('');

    try {
      let result;
      if (mode === 'edit' && productToEdit) {
        await editProduct(formData);
        result = { message: 'Product updated successfully!' };
      } else {
        await addProduct(formData);
        setFormData(defaultNewProductData);
        result = { message: 'Product added successfully!' };
      }

      if (result && result.message) {
        setSuccessMessage(result.message);

        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.log('Error caught in handleSubmit:', error);
      setFormError(`Submission failed: ${error.message}`);
    }
  }

  const {
    typeList: categoryOptions,
    newValue: newCategoryInput,
    setNewValue: setNewCategoryInput,
    handleAdd: handleAddCategory,
  } = useNewSelection(
    'category',
    categories,
    setCategories,
    setFormData,
    'category'
  );

  const {
    typeList: storeOptions,
    newValue: newStoreInput,
    setNewValue: setNewStoreInput,
    handleAdd: handleAddStore,
  } = useNewSelection('store', stores, setStores, setFormData, 'store');

  const handleDismissError = () => {
    setFormError(null);
  };

  const modeDisplay = mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <>
      {formError && (
        <ErrorContainer onDismiss={handleDismissError}>
          {formError}
        </ErrorContainer>
      )}

      {successMessage && <SuccessContainer>{successMessage}</SuccessContainer>}

      <div className={styles.addNewProduct}>
        <h2>{modeDisplay} Your Favorite</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="store">Store</label>
            <select
              id="store"
              name="store"
              value={formData.store}
              onChange={handleChange}
            >
              <option value=""></option>
              {storeOptions.map((store, index) => (
                <option value={store} key={index}>
                  {store}
                </option>
              ))}
              <option value="NEW_STORE">-- Add New Store --</option>
            </select>
          </div>
          {formData.store === 'NEW_STORE' && (
            <NewSelection
              type="Store"
              newSelectionInput={newStoreInput}
              setNewSelectionInput={setNewStoreInput}
              handleAddSelection={handleAddStore}
            />
          )}
          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value=""></option>
              {categoryOptions.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
              <option value="NEW_CATEGORY">-- Add New Category --</option>
            </select>
          </div>
          {formData.category === 'NEW_CATEGORY' && (
            <NewSelection
              type="Category"
              newSelectionInput={newCategoryInput}
              setNewSelectionInput={setNewCategoryInput}
              handleAddSelection={handleAddCategory}
            />
          )}

          <div className={styles.formGroup}>
            <label htmlFor="image">Image </label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formActions}>
            <button
              className={styles.addNewButton}
              type="submit"
              disabled={percentage !== null && percentage < 100}
            >
              {modeDisplay} New Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
