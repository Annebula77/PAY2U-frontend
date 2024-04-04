export const calculateSubscriptionCost = (tariff: {
  amount: number;
  days_amount: number;
}): number => {
  const dailyRate = tariff.amount / 30;
  return dailyRate * tariff.days_amount;
};
