import { createContext, useContext, useEffect, useState } from 'react';
/* eslint-disable react-refresh/only-export-components */

const ListContext = createContext();

export function useLists() {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error('useLists must be used within a ListProvider');
  }
  return context;
}

function getListFromLS(storageKey, defaultList) {
  try {
    const storedList = localStorage.getItem(storageKey);
    if (storedList) {
      const parsedList = JSON.parse(storedList);
      // Filter out any elements that are not strings (like null, undefined, or objects)
      const cleanParsedList = parsedList.filter(item => typeof item === 'string'); 
      
      // Merge the clean list with defaults
      return Array.from(new Set([...defaultList, ...cleanParsedList]));
    }
  } catch (err) {
    console.error(`Error loading ${storageKey}:`, err.message);
  }
  return defaultList;
}

const defaultCategories = ['Food', 'Snack', 'Drink', 'House'];
const defaultStores = ['Walmart', "Trader Joe's", 'Costco', 'Target'];

export function ListProvider({ children }) {
  const [categories, setCategories] = useState(
    getListFromLS('category', defaultCategories)
  );
  const [stores, setStores] = useState(getListFromLS('store', defaultStores));

  useEffect(() => {
    try {
      localStorage.setItem('category', JSON.stringify(categories));
    } catch (err) {
      console.error('Error saving categories:', err.message);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('store', JSON.stringify(stores));
    } catch (err) {
      console.error('Error saving stores:', err.message);
    }
  }, [stores]);

  function addList(type, newValue) {
    const trimmed = newValue.trim();
    if (!trimmed) return;

    const [list, setList] =
      type === 'category' ? [categories, setCategories] : [stores, setStores];

    const exists = list.some(
      (item) => item.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return;

    setList((prev) => [...prev, trimmed]);
  }

  function deleteList(type, itemToDelete) {
    const [list, setList] =
      type === 'category' ? [categories, setCategories] : [stores, setStores];

    const updatedItems = list.filter(
      (item) => item.toLowerCase() !== itemToDelete.toLowerCase()
    );

    setList(updatedItems);
  }

  function editList(type, itemToEdit, newValue) {
    const trimmed = newValue.trim();
    if (!trimmed) return;

    const [list, setList] =
      type === 'category' ? [categories, setCategories] : [stores, setStores];

    if (trimmed.toLowerCase() === itemToEdit.toLowerCase()) 
      return;

   const exists = list.some(
      (item) => 
        item.toLowerCase() === trimmed.toLowerCase() && // The new name exists
        item.toLowerCase() !== itemToEdit.toLowerCase() // AND it's NOT the item we started with
    );
    if (exists) return;

    const updatedItems = list.map((item) => {
      if (item.toLowerCase() == itemToEdit.toLowerCase()) {
        return trimmed;
      }
      return item
      
    });

    setList(updatedItems);
  }

  const value = {
    categories,
    setCategories,
    stores,
    setStores,
    addList,
    deleteList,
    editList,
  };
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}
