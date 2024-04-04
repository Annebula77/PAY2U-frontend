import { compareAsc } from "date-fns";
import { type ClientSubscriptionsModal } from "../models/clientsSubscriptionsSchema";
import { addOneDay } from "./addOneDay";

// NOTE: Функция для обработки массива подписок и получения отсортированного массива дат с добавлением одного дня
export const getProcessedExpirationDates = (
  clientSubscriptions: ClientSubscriptionsModal
): Date[] => {
  const dates = clientSubscriptions.results
    .map(sub => addOneDay(sub.expiration_date))
    .sort(compareAsc);
  return dates;
};