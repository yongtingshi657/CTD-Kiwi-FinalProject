export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDateForDBFormat(formData) {
  // database date (MM/DD/YYYY)
  const inputDateString = formData.date;
  const [year, month, day] = inputDateString.split('-');
  return`${month}/${day}/${year}`;
}


  export function getDateFormatForForm(databaseDate) {
    // database date (MM/DD/YYYY) to the form date (YYYY-MM-DD).
    if (databaseDate && databaseDate.includes('-')) {
        return databaseDate; // Already in YYYY-MM-DD
    }
    if (databaseDate && databaseDate.includes('/')) {
        const [month, day, year] = databaseDate.split('/');
        return `${year}-${month}-${day}`;
    }
    return '';
   
  }