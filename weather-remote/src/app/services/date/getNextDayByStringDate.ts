const getNextDayByStringDate = () => {
  const day = new Date(); 
  const dateInstance = new Date(day);
  dateInstance.setDate(day.getDate() + 1);
 
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userLocale = navigator?.language;
  return dateInstance.toLocaleDateString(userLocale, {
    timeZone: timeZone,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export { getNextDayByStringDate };
