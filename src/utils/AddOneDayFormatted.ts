import { addOneDay } from "./addOneDay";

export const AddOneDayFormatted = (dateString: string): string => {
  const newDate = addOneDay(dateString);
  const formattedDate = newDate.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
  return formattedDate;
};
