import { useCallback, useMemo, useState } from 'react';
import ProductCard from '../feature/ProductCard';
import Search from '../feature/Search';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import ErrorContainer from '../shared/ErrorContainer';
import Filter from '../feature/Filter';

function Home({
  products,
  deleteProduct,
  editProduct,
  categories,
  stores,
  isLoading,
  errorMessage,
  handleDismissError
}) {
  const [searchResult, setSearchResult] = useState(null);
  const [query, setQuery] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStore, setSelectedStore] = useState('All');

  function handleFilter(filterType, value) {
    if (filterType === 'category') {
      setSelectedCategory(value);
    } else if (filterType === 'store') {
      setSelectedStore(value);
    }
    setSearchResult(null);
    setQuery('');
  }

  const filteredProducts = useMemo(() => {
    const filterbyCategory = selectedCategory !== 'All';
    const filterbyStore = selectedStore !== 'All';

    if (selectedCategory === 'All' && selectedStore === 'All') {
      return products;
    }

    if (filterbyCategory && filterbyStore) {
      // Filter the full list by BOTH conditions
      return products.filter(
        (product) =>
          product.category === selectedCategory &&
          product.store === selectedStore
      );
    }
    if (filterbyCategory) {
      return products.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (filterbyStore) {
      return products.filter((product) => product.store === selectedStore);
    }

    return products;
  }, [products, selectedCategory, selectedStore]);

  const isSearching = searchResult !== null;
  const isFiltering =
    !isSearching && (selectedCategory !== 'All' || selectedStore !== 'All');

  const displayProducts = isSearching ? searchResult : filteredProducts;

  const searchNotFound = isSearching && displayProducts.length === 0;
  const filterNotFound = isFiltering && displayProducts.length === 0;

  // search function
  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery);
    const searchWord = searchQuery.toLowerCase().trim();

    if (searchWord === '') {
      setSearchResult(null);
      return;
    }
    // search based on filted result
    const listToSearch = filteredProducts;

    if (listToSearch.length === 0) {
      setSearchResult([]);
      return;
    }
    const allKeys = listToSearch.length > 0 ? Object.keys(listToSearch[0]) : [];
    const excludedKeys = ['id', 'img'];
    const searchableKeys = allKeys.filter((key) => !excludedKeys.includes(key));
    const newSearch = listToSearch.filter((product) => {
      return searchableKeys.some((key) => {
        return String(product[key]).toLowerCase().includes(searchWord);
      });
    });
    setSearchResult(newSearch);
  }, [filteredProducts])

  function handleShowAll() {
    setSelectedCategory('All');
    setSelectedStore('All');
    setSearchResult(null);
    setQuery('');
  }

  function handleCancelSearch() {
    setSearchResult(null);
    setQuery('');
  }


  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading Products...</div>;
  }

  if (errorMessage) {
    return (
      <ErrorContainer onDismiss={handleDismissError}>
        {errorMessage}
      </ErrorContainer>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <section className={styles.actionSection}>
      <div className={styles.actionsContainer}>
        <Search
          query={query}
          handleSearch={handleSearch}
          handleCancelSearch={handleCancelSearch}
          isSearching={isSearching}
        />
        <Link to={'/add'}>
          <button>Add New Product</button>
        </Link>
      </div>
      <div className={styles.filterRow}>
        <Filter 
        handleFilter={handleFilter}
        selectedCategory={selectedCategory}
        selectedStore={selectedStore}
        categories={categories}
        stores={stores}
        handleShowAll={handleShowAll}
        />
      </div>
      </section>
      {searchNotFound || filterNotFound ? (
        <div className={styles.noMatchContainer}>
          <p>No products found matching your search criteria. </p>
          <Link to={'/add'}>
            <p>Add New Product</p>
          </Link>
        </div>
      ) : (
        <div className={styles.productContainer}>
          {displayProducts.map((product) => (
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
