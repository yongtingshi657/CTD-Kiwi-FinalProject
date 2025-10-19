import { FaSearch, FaTimes } from 'react-icons/fa';
import Styles from './Search.module.css';
import { useRef, useState } from 'react';

function Search({ handleSearch, isSearching, handleCancelSearch }) {
  const inputRef = useRef(null);

  function handleCancel(){
    if (inputRef.current) {
      inputRef.current.value = '';
  }
 
  handleCancelSearch()

}

  return (
    <div className={Styles.searchContainer}>
      {!isSearching && <FaSearch className={Styles.searchIcon} />}

      <input
        className={Styles.searchInput}
        placeholder="Type to Search"
        onChange={handleSearch}
        ref={inputRef}
      />
      {isSearching && <FaTimes className={Styles.cancelIcon} onClick={handleCancel}/>}
    </div>
  );
}

export default Search;
