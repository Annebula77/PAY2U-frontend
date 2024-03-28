// features/cookieConsent/cookieConsentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CookieConsentState {
  consentGiven: boolean;
}

const initialState: CookieConsentState = {
  consentGiven: false,
};

export const cookieConsentSlice = createSlice({
  name: 'cookieConsent',
  initialState,
  reducers: {
    setCookieConsent: (state, action: PayloadAction<boolean>) => {
      state.consentGiven = action.payload;
    },
  },
});


export const { setCookieConsent } = cookieConsentSlice.actions;


export default cookieConsentSlice.reducer;
