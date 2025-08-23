import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import flatProductConfig from 'process/NewBusiness/ManualUnderwriting/_utils/flatProductConfig';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const { basicProductCoverageLoadingList, id } = action.payload;
  const ownCoverageList = lodash.get(state, 'processData.coverageList', []) || [];
  const index = lodash.findIndex(ownCoverageList, (item: any) => item?.id === id);
  const riderCoverageLoadingList = ownCoverageList?.[index]?.coverageLoadingList;
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
    const coverage = lodash.get(draftState, `processData.coverageList[${index}]`);
    const coreCode = formUtils.queryValue(lodash.get(coverage, `coreCode`));
    const planProductConfig = lodash.get(state, 'planProductConfig');
    const productList = flatProductConfig({ planProductConfig });
    const newList = lodash
      .chain(coverageLoadingList)
      .map((loadingItem: any, loadingIndex: any) => {
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
            } else if (key === 'id') {
              const riderLoadingId = riderCoverageLoadingList?.[loadingIndex]?.id;
              if (!riderLoadingId) {
                dataMap.set(key, uuidv4());
              } else {
                dataMap.set(key, riderLoadingId);
              }
            } else {
              dataMap.set(key, value);
            }
          })
          .value();
        return Object.fromEntries(dataMap);
      })
      .value();
    lodash.set(draftState, `processData.coverageList[${index}].coverageLoadingList`, newList || []);
  });
  return {
    ...nextState,
  };
};
