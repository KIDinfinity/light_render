import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { planProductConfig } from 'process/NewBusiness/ManualUnderwriting/types';
import {
  addCopy,
  insuredMatch,
} from 'process/NewBusiness/ManualUnderwriting/_utils/copyRuleMatching';
import flatProductConfig from 'process/NewBusiness/ManualUnderwriting/_utils/flatProductConfig';
import fixOfflimitLoading from 'process/NewBusiness/ManualUnderwriting/_utils/fixOfflimitLoading';
import { v4 as uuidv4 } from 'uuid';

type key = 'pmLoading' | 'extraMortality' | 'flatMortality';

export default (state: any) => {
  const productCode = formUtils.queryValue(state?.addingLoadingSelectedProduct?.productName);
  const clientId = formUtils.queryValue(state?.addingLoadingSelectedProduct?.name);
  const addingLoadingItems = state.addingLoadingItems || [];
  const periodMapping = {
    PT: 'payPeriod',
    RT: 'indemnifyPeriod',
  };
  const keyMaping = {
    pmLoading: 'pmPeriod',
    extraMortality: 'emPeriod',
    flatMortality: 'fmPeriod',
  };
  const judgeKeyMapping = {
    pmLoading: 'rateTermFollowCode',
    extraMortality: 'meTermFollowCode',
    flatMortality: 'feTermFollowCode',
  };

  const planProductConfig: planProductConfig = lodash.get(state, 'planProductConfig', {});
  const productList = flatProductConfig({ planProductConfig });
  const coverageList = state.processData.coverageList || [];
  for (const coverageItem of coverageList) {
    const matchInsured = !clientId || insuredMatch(coverageItem, [{ clientId }]);
    const coreCode = formUtils.queryValue(coverageItem?.coreCode);

    if (productCode.includes(coreCode) && matchInsured) {
      // 对每一个要新增的loading，都对其初始化一些默认值，放进当前的coverage/rider，并copy到符合copy rule的coverage/rider下
      addingLoadingItems.map((loading) => {
        const extraChangeMap: any = {};
        Object.entries(loading).map(([key, value]) => {
          if (
            formUtils.queryValue(value) &&
            ['pmLoading', 'extraMortality', 'flatMortality'].includes(key)
          ) {
            const judgeKey = judgeKeyMapping[key as key];
            const loadingTermFollowCode = lodash
              .chain(productList)
              .find((item) => item.productCode === coreCode)
              .get(judgeKey)
              .value();
            const dataSourceKey = periodMapping[loadingTermFollowCode] || 'payPeriod';

            const updateKey = keyMaping[key as key];
            extraChangeMap[updateKey] = formUtils.queryValue(coverageItem[dataSourceKey]);
          }
        });
        const finalLoading = {
          ...loading,
          ...extraChangeMap,
          coverageId: coverageItem.id,
          id: uuidv4(),
        };
        if (!coverageItem.coverageLoadingList) {
          coverageItem.coverageLoadingList = [];
        }
        coverageItem.coverageLoadingList.push(finalLoading);
        addCopy(state, { copyItem: finalLoading, isLoading: true, coreCode, clientId });
      });
    }
  }
  state.processData.coverageList = fixOfflimitLoading(coverageList, planProductConfig);
  lodash.set(state, 'addingLoadingItems', []);
  lodash.set(state, 'addingLoadingSelectedProduct', {});
};
