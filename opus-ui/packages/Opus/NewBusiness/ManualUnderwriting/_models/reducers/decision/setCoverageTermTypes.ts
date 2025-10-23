import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { coreCode, productList } = lodash.pick(action?.payload, [
    'coreCode',
    'issueAge',
    'submissionDate',
    'productList',
  ]);

  const nextState = produce(state, (draftState: any) => {
    const coveragePath = 'modalData.processData.coverageList';
    const coverageList = lodash.cloneDeep(lodash.get(draftState, coveragePath));

    if (productList && !lodash.isEmpty(productList?.[0])) {
      const { policyTermType, premiumTermType } = productList[0];

      coverageList.forEach((item: any) => {
        const { coreCode: itemCode } = item;

        if (coreCode === formUtils.queryValue(itemCode)) {
          item.indemnifyPeriodUnit = policyTermType;
          item.payPeriodUnit = premiumTermType;
        }
      });

      lodash.set(draftState, coveragePath, coverageList);
    }
  });

  return nextState;
};
