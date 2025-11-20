import { MdEdit } from 'react-icons/md';
import styles from './Filter.module.css';

function Filter({
  handleShowAll,
  selectedCategory,
  selectedStore,
  categories,
  stores,
  handleFilter,
  onOpen,
}) {
  return (
    <>
      <div className={styles.filterDiv}>
        <button
          onClick={handleShowAll}
          className={`${styles.filterButton} ${
            selectedCategory === 'All' && selectedStore === 'All'
              ? styles.active
              : ''
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilter('category', category)}
            className={`${styles.filterButton} ${
              selectedCategory === category ? styles.active : ''
            }`}
          >
            {category}
          </button>
        ))}{' '}
        <span className={styles.editButton} onClick={onOpen}>
          <MdEdit />
        </span>
      </div>
      <div className={styles.filterDiv}>
        <label className={styles.filterLabel} htmlFor="store-select">
          Filter by Store:
        </label>
        <select
          className={styles.filterSelect}
          id="store-select"
          value={selectedStore}
          onChange={(e) => handleFilter('store', e.target.value)}
        >
          <option value="All">All Stores</option>
          {stores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Filter;
