import { useState } from 'react';
import ProductCard from '../feature/ProductCard';
import Search from '../feature/Search';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Home({ products, deleteProduct, editProduct }) {
  const [searchResult, setSearchResult] = useState(null);

  const isSearching = searchResult !== null;

  const filteredProduct = isSearching ? searchResult : products;

  console.log(searchResult);

  function handleSearch(e) {
    const searchWord = e.target.value.toLowerCase().trim();

    if (searchWord === '') {
      setSearchResult(null);
      return;
    }

    const allKeys = Object.keys(products[0]);
    const excludedKeys = ['id', 'img'];
    const searchableKeys = allKeys.filter((key) => !excludedKeys.includes(key));
    const newSearch = products.filter((product) => {
      return searchableKeys.some((key) => {
        return String(product[key]).toLowerCase().includes(searchWord);
      });
    });

    setSearchResult(newSearch);
  }

  function handleCancelSearch() {
    setSearchResult(null);
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.actionsContainer}>
        <Search
          handleSearch={handleSearch}
          handleCancelSearch={handleCancelSearch}
          isSearching={isSearching}
        />
        <Link to={'/add'}>
          <button>Add New Product</button>
        </Link>
      </div>
      {isSearching && filteredProduct.length === 0 ? (
        <div className={styles.noMatchContainer}>
          <p>No products found matching your search criteria. </p>
          <Link to={'/add'}>
            <p>Add New Product</p>
          </Link>
        </div>
      ) : (
        <div className={styles.productContainer}>
          {filteredProduct.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
