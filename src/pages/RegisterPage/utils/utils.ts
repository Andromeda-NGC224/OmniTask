export const isValidBirthday = (dateString?: string) => {
  if (!dateString) return true;
  const date = new Date(dateString);
  return (
    !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateString
  );
};
