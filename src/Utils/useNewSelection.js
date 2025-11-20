import { useState } from 'react';

// typeList -> categoryList
// setTypeList => setcategoryLsit

export const useNewSelection = (
  typeList,
  setTypeList,
  setFormData,
  formField
) => {
  const [newValue, setNewValue] = useState('');

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
