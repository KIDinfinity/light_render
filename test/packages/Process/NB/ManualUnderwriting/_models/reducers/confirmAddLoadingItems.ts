import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import flatProductConfig from 'process/NB/ManualUnderwriting/utils/flatProductConfig';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const productCode = formUtils.queryValue(state?.addingLoadingSelectedProduct?.productName);
    const insured = formUtils.queryValue(state?.addingLoadingSelectedProduct?.name);
    const addingLoadingItems = state.addingLoadingItems || [];
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

    const planProductConfig = lodash.get(state, 'planProductConfig', {});
    const productList = flatProductConfig({ planProductConfig });
    const coverageList = lodash
      .chain(state)
      .get('businessData.policyList[0].coverageList')
      .map((coverage: any) => {
        const matchInsured = (() => {
          if (insured) {
            return lodash
              .chain(coverage)
              .get('coverageInsuredList', [])
              .some((coverageItem: any) => coverageItem?.clientId == insured)
              .value();
          }
          return true;
        })();

        if (lodash.includes(productCode, coverage.coreCode) && matchInsured) {
          return {
            ...coverage,
            coverageLoadingList: [
              ...(lodash.get(coverage, 'coverageLoadingList') || []),
              ...lodash
                .chain(addingLoadingItems)
                .map((loading: any) => {
                  const extraChangeMap = new Map();
                  (() => {
                    lodash
                      .chain(loading)
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
                          const vv: string = (() => {
                            return formUtils.queryValue(lodash.get(coverage, dataSourceKey));
                          })();
                          extraChangeMap.set(key, vv);
                        }
                      })
                      .value();
                  })();
                  return {
                    ...loading,
                    ...Object.fromEntries(extraChangeMap),
                  };
                })
                .value(),
            ],
          };
        }
        return coverage;
      })
      .value();
    lodash.set(draftState, `businessData.policyList[0].coverageList`, coverageList);
    lodash.set(draftState, 'addingLoadingItems', []);
    lodash.set(draftState, 'addingLoadingSelectedProduct', {});
  });
  return { ...nextState };
};
