import { type ResultSubscriptionModel } from 'src/models/clientsSubscriptionsSchema';

export const getNearestPaymentDate = (
  subscriptions: ResultSubscriptionModel[]
): ResultSubscriptionModel | null => {
  const activeSubscriptions = subscriptions
    .filter(sub => sub.is_active)
    .sort(
      (a, b) =>
        new Date(a.expiration_date).getTime() -
        new Date(b.expiration_date).getTime()
    );

  if (activeSubscriptions.length === 0) {
    return null;
  }

  const nearestSubscription = activeSubscriptions[0];

  const expirationDate = new Date(nearestSubscription.expiration_date);

  if (isNaN(expirationDate.getTime())) {
    console.error('Невалидная дата:', nearestSubscription.expiration_date);
    return null;
  }

  return {
    ...nearestSubscription,
    expiration_date: expirationDate.toISOString(),
  };
};
