import { toUpper } from 'lodash';
import { LS, LSKey } from '@/utils/cache';
import lodash from 'lodash';

export const filterConfigByBusinessCode = (config: any) => {
  const userBusinessCode = LS.getItem(LSKey.CURRENTUSER)?.businessCode;

  return lodash.filter(config, (configItem) => {
    if (!configItem?.businessCode) return true;

    const userBusinessCodeList = lodash.compact(lodash.split(userBusinessCode, ','));
    const businessCodeList = lodash.compact(lodash.split(configItem?.businessCode, ','));

    return !lodash.isEmpty(lodash.intersection(userBusinessCodeList, businessCodeList));
  });
};

export const filterConfig = (config, params) =>
  (config &&
    config?.filter((item) =>
      params?.find((el) => toUpper(el.fieldName) === toUpper(item.fieldName))
    )) ||
  [];
