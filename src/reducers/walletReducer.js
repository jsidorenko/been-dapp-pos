// @flow
import {
  INIT_WALLET_SDK,
  SET_BALANCE,
  SET_PAYMENTS_HISTORY,
  SET_DATA_HISTORY,
} from '../constants/walletConstants';

export type WalletReducerState = {
  balance: string,
  isSdkInitialized: boolean,
  paymentsHistory: Object[],
  dataHistory: Object[],
}

export type WalletReducerAction = {
  type: string,
  payload?: any,
};

const initialState = {
  balance: '',
  isSdkInitialized: false,
  paymentsHistory: [],
  dataHistory: [],
};

export default function walletReducer(
  state: WalletReducerState = initialState,
  action: WalletReducerAction,
) {
  switch (action.type) {
    case SET_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };
    case INIT_WALLET_SDK:
      return {
        ...state,
        isSdkInitialized: action.payload,
      };
    case SET_PAYMENTS_HISTORY:
      return {
        ...state,
        paymentsHistory: action.payload,
      };
    case SET_DATA_HISTORY:
      return {
        ...state,
        dataHistory: action.payload,
      };
    default:
      return state;
  }
}
