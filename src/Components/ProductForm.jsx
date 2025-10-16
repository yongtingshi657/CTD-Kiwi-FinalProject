import React, { useEffect, useState } from 'react';
import Mango from '/TraderJoesMango.JPG';
import styles from './ProductForm.module.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

const ProductForm = ({
  addProduct,
  categories,
  setCategories,
  stores,
  setStores,
}) => {
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [formData, setFormData] = useState({
    name: '',
    date: getTodayDate(),
    category: '',
    store: '',
    note: '',
  });

  const [file, setFile] = useState('');
  const [percentage, setPercentage] = useState(null)

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
            setPercentage(progress)
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
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prev)=> ({...prev, img: downloadURL}))
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [newStoreNameInput, setNewStoreNameInput] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      formData.name.trim().length === 0 ||
      formData.category === '' ||
      formData.store === ''
    ) {
      alert('Please fill in the Product name and select a store and category');
      return;
    }

    addProduct(formData);
    setFormData({
      name: '',
      date: getTodayDate(),
      category: '',
      store: '',
      note: '',
    });
  }

  function handleAddCategory() {
    const categoryName = newCategoryInput.trim();
    if (categoryName.length === 0) {
      return;
    }

    setCategories((prev) => [...prev, categoryName]);

    setFormData((prevData) => ({ ...prevData, category: categoryName }));

    setNewCategoryInput('');
  }

  function handleAddStore() {
    const storeName = newStoreNameInput.trim();
    if (storeName.length === 0) {
      return;
    }

    setStores((prev) => [...prev, storeName]);

    setFormData((prevData) => ({ ...prevData, store: storeName }));

    setNewStoreNameInput('');
  }

  return (
    <div className={styles.addNewProduct}>
      <h2>Add Your Favorite</h2>
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
            {stores.map((store, index) => (
              <option value={store} key={index}>
                {store}
              </option>
            ))}
            <option value="NEW_STORE">-- Add New Store --</option>
          </select>
        </div>
        {formData.store === 'NEW_STORE' && (
          <div className={styles.newInput}>
            <input
              value={newStoreNameInput}
              onChange={(e) => setNewStoreNameInput(e.target.value)}
            ></input>
            <button onClick={handleAddStore}>Add New Store</button>
          </div>
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
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
            <option value="NEW_CATEGORY">-- Add New Category --</option>
          </select>
        </div>
        {formData.category === 'NEW_CATEGORY' && (
          <div className={styles.newInput}>
            <input
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
            ></input>
            <button onClick={handleAddCategory}>Add New Category</button>
          </div>
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
          <button className={styles.addNewButton} type="submit" disabled={percentage!== null && percentage <100}>
            Add New Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
