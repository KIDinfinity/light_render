/*
 * @Descripttion:
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:33
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-09 17:56:36
 */
import { produce } from 'immer';
import order from '../../order/field';
import type OrderDirection from '../../enum/orderDirection';

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
    draft.dynamicMergedConfigs = [...draft.dynamicMergedConfigs];
    draft.dynamicMergedConfigs = order({
      list: [...draft.dynamicMergedConfigs],
      order: o,
    });

    return draft;
  });

  return {
    ...nextState,
  };
};
