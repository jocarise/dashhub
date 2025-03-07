const getDateByStringDate = (inputDate?: string) => {
  if(!inputDate) {
    return '';
  }

  const dateInstance = new Date(inputDate);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userLocale = navigator?.language;
  return dateInstance.toLocaleDateString(userLocale, {
    timeZone: timeZone,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export { getDateByStringDate };
