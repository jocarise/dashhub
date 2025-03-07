const getDayByStringDate = (inputDate?: string) => {
  if(!inputDate) {
    return '';
  }

  const userLocale = navigator?.language;
  const dayOfWeek = new Date(inputDate).toLocaleString(userLocale, {
    weekday: 'long',
  });
  return dayOfWeek;
};

export { getDayByStringDate };
