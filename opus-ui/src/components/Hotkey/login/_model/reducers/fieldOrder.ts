/*
 * @Descripttion:
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:33
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 15:50:08
 */
import { produce } from 'immer';
import order from '../../order/pureField';
import type OrderDirection from '../../../common/enum/orderDirection';

interface IAction {
  payload: {
    order: OrderDirection;
  };
}

export default (state: any, action: IAction) => {
  const {
    payload: { order: o },
  } = action;

  const nextState = produce(state, (draft: any) => {
    draft.loginList = [...draft.loginList];

    draft.loginList = order({
      list: [...draft.loginList],
      order: o,
    });

    return draft;
  });

  return {
    ...nextState,
  };
};
