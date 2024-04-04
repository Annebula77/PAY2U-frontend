import { parseISO, addDays } from 'date-fns';

export const addOneDay = (dateString: string): Date => {
  const date = parseISO(dateString);
  return addDays(date, 1);
};

