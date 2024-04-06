import { compareAsc } from 'date-fns';
import { type ClientSubscriptionsModel } from '../models/clientsSubscriptionsSchema';
import { addOneDay } from './addOneDay';

// NOTE: Функция для обработки массива подписок и получения отсортированного массива дат с добавлением одного дня
export const getProcessedExpirationDates = (
  clientSubscriptions: ClientSubscriptionsModel
): Date[] => {
  const dates = clientSubscriptions.results
    .map(sub => addOneDay(sub.expiration_date))
    .sort(compareAsc);
  return dates;
};
