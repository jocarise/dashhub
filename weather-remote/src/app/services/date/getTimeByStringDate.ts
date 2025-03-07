const getTimeByStringDate = (inputDate?: string) => {
  if(!inputDate) {
    return '';
  }

  const userLocale = navigator?.language;
  const date = new Date(inputDate);
  return date.toLocaleString(userLocale, { hour: 'numeric', hour12: true });
};

export { getTimeByStringDate };
