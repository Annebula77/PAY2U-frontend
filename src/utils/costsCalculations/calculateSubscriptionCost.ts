export const calculateSubscriptionCost = (tariff: {
  amount: number;
  days_amount: number;
}): number => {
  const dailyRate = tariff.amount / 30;
  return Math.round(dailyRate * tariff.days_amount);
};
