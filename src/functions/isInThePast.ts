const isInThePast = (day: string, hour: string) => {
  const dateParts = day.split('.');
  const [hours, minutes] = hour.split(':');
  const dateObject = new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0]),
    Number(hours),
    Number(minutes)
  );
  const currentDate = new Date();

  if (dateObject <= currentDate) {
    return true;
  } else {
    return false;
  }
};

export default isInThePast;
