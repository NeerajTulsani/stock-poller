import { RootState } from './store';

export const selectCrypto = (state: RootState) => state.crypto;
export const selectPrices = (state: RootState) => state.prices;
export const selectModalOpen = (state: RootState) => state.modalopen;
