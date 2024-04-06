import { parseISO, isSameMonth, endOfMonth } from 'date-fns';
import { type ClientSubscriptionsModel } from '../models/clientsSubscriptionsSchema';

export const calculatePaymentForCurrentMonth = (
  clientSubscriptions: ClientSubscriptionsModel
): number => {
  const today = new Date();
  const endOfCurrentMonth = endOfMonth(today);

  const total = clientSubscriptions.results.reduce((acc, sub) => {
    if (
      sub.is_active &&
      isSameMonth(parseISO(sub.expiration_date), endOfCurrentMonth)
    ) {
      return acc + sub.tariff.amount;
    }
    return acc;
  }, 0);

  return total;
};
