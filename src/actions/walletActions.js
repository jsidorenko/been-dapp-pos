// @flow

import get from 'lodash.get';
import { BigNumber } from 'bignumber.js';
import smartWalletService from '../services/wallet';
import { SET_BALANCE, INIT_WALLET_SDK } from '../constants/walletConstants';

const TOKEN_ADDRESS = '0xF383e4C078b34Da69534A7B7F1F381d418315273';

export const fetchBalanceAction = () => {
  return async (dispatch: Function) => {
    const balances = await smartWalletService.getAccountPendingBalances();

    const tokenBalance = (balances || []).find(token => {
      return get(token, 'token.address', '').toLowerCase() === TOKEN_ADDRESS.toLowerCase();
    });
    const balance = get(tokenBalance, 'incoming', new BigNumber(0));

    dispatch({
      type: SET_BALANCE,
      payload: balance.toString(),
    });
  };
};

export const initSdkAction = (pk: string) => {
  return async (dispatch: Function) => {
    await smartWalletService.init(pk);
    const accounts = await smartWalletService.getAccounts();
    if (!accounts.length || !get(accounts, '[0].address')) return false;
    await smartWalletService.connectAccount(accounts[0].address);

    dispatch({
      type: INIT_WALLET_SDK,
      payload: true,
    });
  };
};
