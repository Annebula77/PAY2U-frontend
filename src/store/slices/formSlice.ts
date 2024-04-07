import { createSlice } from '@reduxjs/toolkit';
import { type AddSubscriptionModel } from 'src/models/addSubscriptionSchema';

const initialState: AddSubscriptionModel = {
  subscription: 0,
  charge_account: '',
  tariff: 0,
  is_auto_pay: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSubscription(state, action) {
      state.subscription = action.payload;
    },

    setAccount(state, action) {
      state.charge_account = action.payload;
    },
    setTariff(state, action) {
      state.tariff = action.payload;
    },
    setAutoPay(state, action) {
      state.is_auto_pay = action.payload;
    },
  },
});

export const { setSubscription, setAccount, setTariff, setAutoPay } =
  formSlice.actions;
export default formSlice.reducer;
