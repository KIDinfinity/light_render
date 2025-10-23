/*
 * @Descripttion: reducers - login - 移除
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:33
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 16:11:13
 */

import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const {
    payload: { id },
  } = action;

  const nextState = produce(state, (draft: any) => {
    draft.dynamicMergedConfigs = lodash
      .chain(draft.loginList)
      .filter((c) => c.id !== id)
      .map((m) => ({
        ...m,
      }))
      .value();

    return draft;
  });

  return {
    ...nextState,
  };
};
