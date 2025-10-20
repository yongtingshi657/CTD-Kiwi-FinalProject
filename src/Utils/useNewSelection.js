import { useEffect, useState } from 'react';

// typeList -> categoryList
// setTypeList => setcategoryLsit

export const useNewSelection = (
  storageKey,
  typeList,
  setTypeList,
  setFormData,
  formField
) => {
  const [newValue, setNewValue] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  //   save data to local storage
  useEffect(() => {
    if (!isInitialLoad)
      try {
        localStorage.setItem(storageKey, JSON.stringify(typeList));
      } catch (err) {
        console.error(err.message);
      }
  }, [typeList, storageKey]);

  //   get list from local storage
  useEffect(() => {
    try {
      const storedList = localStorage.getItem(storageKey);
      if (storedList) {
        const locallyAdded = JSON.parse(storedList);
        const mergedList = Array.from(new Set([...typeList, ...locallyAdded]));
        setTypeList(mergedList);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsInitialLoad(false);
    }
  }, [storageKey]);

  const handleAdd = () => {
    const trimmed = newValue.trim();
    if (!trimmed) return;

    const exists = typeList.some(
      (item) => item.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setNewValue('');
      return;
    }
    setTypeList((prev) => [...prev, trimmed]);
    setFormData((prev) => ({ ...prev, [formField]: trimmed }));
    setNewValue('');
  };
  return { typeList, newValue, setNewValue, handleAdd };
};
