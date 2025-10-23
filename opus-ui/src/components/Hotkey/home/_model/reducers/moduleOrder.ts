/*
 * @Descripttion:
 * @Author: jack_huang
 * @Date: 2019-11-22 14:41:06
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-11-28 11:00:26
 */
import { produce } from 'immer';
import order from '../../order/module';
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

    const { orderConfig, selectModule } = order({
      list: [...draft.dynamicMergedConfigs],
      order: o,
    });

    draft.dynamicMergedConfigs = orderConfig;

    draft.selectModule = selectModule;

    return draft;
  });

  return {
    ...nextState,
  };
};
