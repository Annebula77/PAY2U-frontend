import React from 'react';
import { type NotificationModalProps } from '../components/NotificationModal/NotificationModal';
import { ContainedButton } from '../components/buttons/ContainedButton/ContainedButton';
import { toggleProlongation } from '../store/slices/prolongationSlice';
import { fetchClientSubscriptions } from '../store/slices/clientSubscriptionsSlice';
import { getClientIdFromToken } from './getClientIdFromToken';
import { AppDispatch } from '../store/store';

export const handleCheckSubscriptionDeleted = (
  deletedAt: string | null,
  isAutoPay: boolean,
  setNotificationModalProps: React.Dispatch<
    React.SetStateAction<NotificationModalProps | null>
  >
) => {
  if (deletedAt !== null && isAutoPay === true) {
    setNotificationModalProps({
      type: 'error',
      title: 'Автопродление невозможно!',
      message: 'Вы не можете установить автоплатеж на остановленную подписку.',
      onClose: () => setNotificationModalProps(null),
      actions: (
        <ContainedButton
          variant="contained"
          sx={{ textTransform: 'none' }}
          onClick={() => setNotificationModalProps(null)}
        >
          Принято
        </ContainedButton>
      ),
    });
    return false;
  }
  return true;
};

export const handleToggleProlongation = async (
  subscriptionId: number,
  isAutoPay: boolean,
  setNotificationModalProps: React.Dispatch<
    React.SetStateAction<NotificationModalProps | null>
  >,
  dispatch: AppDispatch
) => {
  const clientId = getClientIdFromToken();
  try {
    await dispatch(
      toggleProlongation({
        subscription_id: subscriptionId,
        is_auto_pay: isAutoPay,
      })
    );
    if (!clientId) {
      return;
    }
    await dispatch(fetchClientSubscriptions({ clientId }));
  } catch (error) {
    console.error('Ошибка при изменении автопродления подписки:', error);
    setNotificationModalProps({
      type: 'error',
      title: 'Ошибка автопродления',
      message:
        'Произошла ошибка при изменении автопродления подписки. Попробуйте еще раз',
      onClose: () => setNotificationModalProps(null),
      actions: (
        <ContainedButton
          variant="contained"
          sx={{ textTransform: 'none' }}
          onClick={() => setNotificationModalProps(null)}
        >
          Принято
        </ContainedButton>
      ),
    });
  }
};
