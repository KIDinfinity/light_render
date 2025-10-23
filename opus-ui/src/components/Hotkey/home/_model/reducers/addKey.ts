/*
 * @Descripttion: reducers - home - 添加
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:33
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-09 17:11:55
 */
import lodash from 'lodash';
import { produce } from 'immer';
// 默认配置
import defaultConfig from '../../config';
import valuesDeep from '../../../common/functions/valuesDeep';
import objectDeep from '../../../common/functions/objectDeep';

export default (state: any, action: any) => {
  let nextState = state;
  const {
    payload: { id, mode, ...restConig },
  } = action;
  id.forEach((item: string) => {
    const { dynamicMergedConfigs } = nextState;
    const oldIds = valuesDeep(dynamicMergedConfigs, 'id');
    const newIds = lodash.concat(oldIds, item);
    const oldConfigs = objectDeep(dynamicMergedConfigs, 'id');
    const newConfigs = lodash.concat(oldConfigs, { id: item, ...restConig });

    nextState = produce(nextState, (draft: any) => {
      draft.dynamicMergedConfigs = lodash
        .chain(defaultConfig)
        .filter((c: any) => newIds.includes(c.id))
        .map((m: any) => ({
          ...m,
          ...lodash.find(newConfigs, ['id', m.id]),
          sections: lodash
            .chain(m.sections)
            .filter((s: any) => newIds.includes(s.id))
            .map((s: any) => ({
              ...s,
              ...lodash.find(newConfigs, ['id', s.id]),
              fields: lodash
                .chain(s.fields)
                .filter((f: any) => newIds.includes(f.id))
                .map((f: any) => ({
                  ...f,
                  ...lodash.find(newConfigs, ['id', f.id]),
                }))
                .value(),
            }))
            .value(),
        }))
        .value();

      return draft;
    });
  });
  return {
    ...nextState,
  };
};
