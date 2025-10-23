import flatProductConfig from './flatProductConfig';
import { formUtils } from 'basic/components/Form';
import type { planProductConfig } from '../types';
import lodash from 'lodash';

export default (coverageList, planProductConfig: planProductConfig) => {
  const productList = flatProductConfig({ planProductConfig });
  const periodMapping = {
    PT: 'payPeriod',
    RT: 'indemnifyPeriod',
  };
  const keyMaping: any = {
    pmLoading: 'pmPeriod',
    extraMortality: 'emPeriod',
    flatMortality: 'fmPeriod',
  };
  const judgeKeyMapping = {
    pmLoading: 'rateTermFollowCode',
    extraMortality: 'meTermFollowCode',
    flatMortality: 'feTermFollowCode',
  };

  return coverageList.map(coverage => ({
    ...coverage,
    coverageLoadingList: coverage.coverageLoadingList?.map(loadingItem => {
      const updateMap = new Map();
      lodash
        .chain(loadingItem)
        .entries()
        .forEach(([k, v]) => {
          const value = formUtils.queryValue(v);
          if (value && ['pmLoading', 'extraMortality', 'flatMortality'].includes(k)) {
            const judgeKey = judgeKeyMapping[k];
            const key = keyMaping[k];
            const loadingTermFollowCode = lodash
              .chain(productList)
              .find(
                (item: any) =>
                  item.productCode === formUtils.queryValue(coverage?.coreCode)
              )
              .get(judgeKey)
              .value();
            const dataSourceKey = periodMapping[loadingTermFollowCode] || 'payPeriod';
            const vv = Number(formUtils.queryValue(lodash.get(coverage, dataSourceKey)) || 0);
            const currentValue = Number(formUtils.queryValue(loadingItem[key]) || 0);
            if(currentValue && currentValue > vv) {
              updateMap.set(key, vv);
            }
          }
        })
        .value();
      return {
        ...loadingItem,
        ...Object.fromEntries(updateMap),
      }
    })
  }))
}