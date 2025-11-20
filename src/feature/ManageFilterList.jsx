import { useState } from 'react';
import { useLists } from '../context/ListContext';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './Modal.module.css';

export default function ManageFilterList({onClose}) {
  const {
    categories,
    stores,
    addList,
    deleteList,
    editList,
  } = useLists();

  const [newInput, setInput] = useState('');
  const [itemEditing, setItemEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  const [activeTab, setActiveTab] = useState('category');

  const type = activeTab;
  const currentList = activeTab === 'category' ? categories : stores;

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!newInput.trim()) {
      return;
    }

    addList(type, newInput);
    setInput('');
  }

  function submitEdit(originItem) {
    // add empty message
    if (!editingText.trim()) {
      return;
    }
    editList(type, originItem, editingText);

    setItemEditing(null);
    setEditingText('');
    console.log('success');
  }

  function handleDeleteClick(item) {
    // add alart
    if (window.confirm(`Are you sure you want to delete ${item}?`)) {
      deleteList(type, item);
    }
  }
  // modal
  // two lists

  function handleEditClick(item) {
    setItemEditing(item);
    setEditingText(item);
  }

  const renderListItems = () => {
    return currentList.map((item) => {
      return (
        <div key={item} className={styles.listItem}>
          {itemEditing === item ? (
            <>
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitEdit(item);
                }}
                className={styles.editInput}
              />
              <button
                className={styles.submitEditBtn}
                onClick={() => submitEdit(item)}
              >
                Submit
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setItemEditing(null);
                  setEditingText('');
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p className={styles.itemText}>{item}</p>
              <MdEdit
                onClick={() => handleEditClick(item)}
                className={styles.editIcon}
              />
              <FaTrashAlt
                onClick={() => handleDeleteClick(item)}
                className={styles.trashIcon}
              />
            </>
          )}
        </div>
      );
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>

        <div className={styles.tabContainer}>
          <button 
          className={`${styles.tabButton} ${activeTab === 'category'? styles.activeTab : '' } `}
          onClick={()=> {setActiveTab('category')}}>Categories</button>
           <button 
           className={`${styles.tabButton} ${activeTab === 'store'? styles.activeTab : '' } `}
           onClick={()=> {setActiveTab('store')}}>Stores</button>
        </div>

        <div className={styles.addNewContainer}>
          <form onSubmit={handleSubmit}>
            <h2 className={styles.sectionTitle} > Add a New {type.charAt(0).toUpperCase()+ activeTab.slice(1)}</h2>
            <div className={styles.formControls}>
            <input
              placeholder={`add a new ${type}`}
              type="text"
              value={newInput}
              onChange={handleChange}
              className={styles.addInput}
            />
            <button type="submit" className={styles.addSubmitBtn}>Add</button>
            </div>
          </form>
        </div>


        <div className={styles.listManager}>
          <h3>{type.charAt(0).toUpperCase()+ activeTab.slice(1)} List</h3>
          {renderListItems()}</div>

        <button onClick={onClose} className={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
}
