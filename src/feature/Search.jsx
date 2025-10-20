import { FaSearch, FaTimes } from 'react-icons/fa';
import Styles from './Search.module.css';

function Search({ handleSearch, isSearching, handleCancelSearch, query }) {

  function handleCancel(){
  handleCancelSearch()

}

  return (
    <div className={Styles.searchContainer}>
      {!isSearching && <FaSearch className={Styles.searchIcon} />}

      <input
        className={Styles.searchInput}
        placeholder="Type to Search"
        onChange={(e) => handleSearch(e.target.value)}
        value={query}
      />
      {isSearching && <FaTimes className={Styles.cancelIcon} onClick={handleCancel}/>}
    </div>
  );
}

export default Search;
