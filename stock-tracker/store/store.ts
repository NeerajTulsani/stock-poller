import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: 'bitcoin',
  reducers: {
    setCrypto: (state, action) => action.payload,
  },
});

const pricesSlice = createSlice({
  name: 'prices',
  initialState: [],
  reducers: {
    setPrices: (state, action) => action.payload,
  }
});

const modalOpenSlice = createSlice({
  name: 'modalopen',
  initialState: false,
  reducers: {
    setModalOpen: (state, action) => action.payload,
  }
});

export const { setCrypto } = cryptoSlice.actions;
export const { setPrices } = pricesSlice.actions;
export const { setModalOpen } = modalOpenSlice.actions;

const makeStore = () =>
  configureStore({
    reducer: {
      crypto: cryptoSlice.reducer,
      prices: pricesSlice.reducer,
      modalopen: modalOpenSlice.reducer,
    },
  });

export const wrapper = createWrapper(makeStore);
export type RootState = ReturnType<typeof makeStore>['getState'];
