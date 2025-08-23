import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';

const getDependentApis = (autoTriggerConfig: any) => {
  return lodash
    .chain(autoTriggerConfig)
    .map((item) => {
      const apis = safeParseUtil(item.conditionJson);
      return lodash.map(lodash.isEmpty(apis) ? [] : apis, (api: any) => {
        return api?.api;
      });
    })
    .flatten()
    .uniq()
    .value();
};

export default (state: any, { payload: { autoTriggerConfig, init = false } }: any) => {
  if (init) {
    return {
      ...state,
      triggerDependencies: lodash.reduce(
        state.triggerDependencies,
        (result: any, item, key) => {
          result[key] = false;
          return result;
        },
        {}
      ),
    };
  }

  const apis = getDependentApis(autoTriggerConfig);
  return {
    ...state,
    triggerDependencies: lodash.reduce(
      apis,
      (result: any, item: any) => {
        result[item] = false;
        return result;
      },
      {}
    ),
  };
};
