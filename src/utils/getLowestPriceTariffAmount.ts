import { type TariffModel } from '../models/singleSubscriptionSchema';

export const getLowestPriceTariffAmount = (tariffs: TariffModel[]) => {
  if (tariffs.length === 0) return 0;
  const lowestPriceTariff = tariffs.reduce((prev, current) =>
    prev.amount < current.amount ? prev : current
  );
  return lowestPriceTariff.amount;
};
