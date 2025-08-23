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

export default (state: any, { payload: { autoTriggerConfig } }: any) => {
  const apis = getDependentApis(autoTriggerConfig);

  return {
    ...state,
    autoTriggerConfig,
    triggerDependencies: lodash.map(apis, (api: string) => ({
      [api]: false,
    })),
  };
};
