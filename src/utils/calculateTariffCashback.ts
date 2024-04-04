export const calculateTariffCashback = (tariff: {
  days_amount: number;
}, cashback_amount: number): number => {
  const dailyRate = cashback_amount / 30;
  return dailyRate * tariff.days_amount;
};