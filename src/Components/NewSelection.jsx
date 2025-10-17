import React from 'react'
import styles from '../pages/ProductForm.module.css';

function NewSelection({type, newSelectionInput, setNewSelectionInput, handleAddSelection}) {
  return (
    <div className={styles.newInput}>
                <input
                  value={newSelectionInput}
                  onChange={(e) => setNewSelectionInput(e.target.value)}
                ></input>
                <button onClick={handleAddSelection}>Add New {type}</button>
              </div>
  )
}

export default NewSelection