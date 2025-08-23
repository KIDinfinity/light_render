import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';

const extra = (buttonParams: any, taskDetail: Object) => {
  const submitData = {};
  const parseButtonParams = safeParseUtil(buttonParams);
  lodash.map(parseButtonParams, (value: any, key: string) => {
    if (lodash.startsWith(value, '$')) {
      parseButtonParams[key] = lodash.trim(value, '$');
    }
    if (lodash.find(taskDetail, (taskValue, taskKey) => taskKey === parseButtonParams[key])) {
      lodash.assign(submitData, { [key]: taskDetail[parseButtonParams[key]] });
    } else if (lodash.isObject(value)) {
      lodash.assign(submitData, { [key]: extra(JSON.stringify(value), taskDetail) });
    } else {
      lodash.assign(submitData, { [key]: value });
    }
    return submitData;
  });
  return submitData;
};

export default ({ serviceItem, defaultConfig, taskDetail }: any) => {
  const buttonParams = lodash.get(serviceItem, 'buttonParams');
  return {
    ...defaultConfig,
    getDataForSubmit: () => extra(buttonParams, taskDetail),
  };
};
