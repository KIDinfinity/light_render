/*
 * @Descripttion: reducers - login - 添加
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:33
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 15:26:14
 */
import lodash from 'lodash';
import { produce } from 'immer';
// 默认配置
import defaultConfig from '../../config';
import valuesDeep from '../../../common/functions/valuesDeep';
import objectDeep from '../../../common/functions/objectDeep';

export default (state: any, action: any) => {
  const { loginList } = state;
  const {
    payload: { id, ...restConig },
  } = action;

  const oldIds = valuesDeep(loginList, 'id');
  const newIds = lodash.concat(oldIds, id);
  const oldConfigs = objectDeep(loginList, 'id');
  const newConfigs = lodash.concat(oldConfigs, { id, ...restConig });

  const nextState = produce(state, (draft: any) => {
    draft.loginList = lodash
      .chain(defaultConfig)
      .filter((c: any) => newIds.includes(c.id))
      .map((m: any) => ({
        ...m,
        ...lodash.find(newConfigs, ['id', m.id]),
      }))
      .value();

    return draft;
  });

  return {
    ...nextState,
  };
};
