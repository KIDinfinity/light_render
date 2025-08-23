import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import flatProductConfig from 'process/NB/ManualUnderwriting/utils/flatProductConfig';

export default (state: any, action: any) => {
  const { basicProductCoverageLoadingList, id } = action.payload;
  const { businessData } = state;
  const ownCoverageList = lodash.get(businessData, 'policyList[0].coverageList', []) || [];
  const index = lodash.findIndex(ownCoverageList, (item: any) => item?.id === id);
  const coverageLoadingList = lodash.map(basicProductCoverageLoadingList, (item: any) => {
    return {
      ...item,
      coverageId: id,
    };
  });

  const periodMapping = {
    PT: 'payPeriod',
    RT: 'indemnifyPeriod',
  };

  const judgeKeyMapping = {
    pmPeriod: 'rateTermFollowCode',
    emPeriod: 'meTermFollowCode',
    fmPeriod: 'feTermFollowCode',
  };

  const nextState = produce(state, (draftState: any) => {
    const coverage = lodash.get(draftState, `businessData.policyList[0].coverageList[${index}]`);
    const coreCode = formUtils.queryValue(lodash.get(coverage, `coreCode`));
    const planProductConfig = lodash.get(state, 'planProductConfig');
    const productList = flatProductConfig({ planProductConfig });
    const newList = lodash
      .chain(coverageLoadingList)
      .map((loadingItem: any) => {
        const dataMap = new Map();
        lodash
          .chain(loadingItem)
          .entries()
          .forEach(([key, value]) => {
            if (['pmPeriod', 'emPeriod', 'fmPeriod'].includes(key)) {
              const judgeKey = lodash.get(judgeKeyMapping, key);
              const loadingTermFollowCode = lodash
                .chain(productList)
                .find((item: any) => item.productCode === coreCode)
                .get(judgeKey)
                .value();
              const vv = formUtils.queryValue(value) || 0;
              const dataSourceKey = periodMapping[loadingTermFollowCode] || 'payPeriod';
              const maxValue = formUtils.queryValue(lodash.get(coverage, dataSourceKey));
              const duration = (() => {
                const relateKeyMapping = {
                  pmPeriod: 'pmLoading',
                  emPeriod: 'extraMortality',
                  fmPeriod: 'flatMortality',
                };
                const relateKey = relateKeyMapping[key];
                if (!formUtils.queryValue(lodash.get(loadingItem, relateKey))) {
                  return '';
                }
                return lodash.min([maxValue, vv]);
              })();
              dataMap.set(key, duration);
            } else {
              dataMap.set(key, value);
            }
          })
          .value();
        return Object.fromEntries(dataMap);
      })
      .value();
    lodash.set(
      draftState,
      `businessData.policyList[0].coverageList[${index}].coverageLoadingList`,
      newList || []
    );
  });
  return {
    ...nextState,
  };
};
