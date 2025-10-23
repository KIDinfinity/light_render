/*
 * @Descripttion:
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:33
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-09 17:28:45
 */
import { produce } from 'immer';
import order from '../../order/section';
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
    const oldSelectSection = draft.selectSection;
    const { orderConfig, selectSection } = order({
      list: [...draft.dynamicMergedConfigs],
      order: o,
    });

    draft.dynamicMergedConfigs = orderConfig;

    selectSection
      ? (draft.selectSection = selectSection)
      : (draft.selectSection = oldSelectSection);

    return draft;
  });

  return {
    ...nextState,
  };
};
