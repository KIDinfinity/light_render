import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import {
  addCopy,
  insuredMatch,
} from 'process/NewBusiness/ManualUnderwriting/_utils/copyRuleMatching';

export default (state: any, action: any) => {
  const { addPopExclusionList } = lodash.pick(action?.payload, ['addPopExclusionList']);
  const productCode = formUtils.queryValue(lodash.get(state, 'productSection.productName'));
  const clientId = formUtils.queryValue(lodash.get(state, 'productSection.name'));
  let ownExclusionList: any = [];
  if (productCode === 'All') {
    ownExclusionList = lodash.get(state, 'processData.policyExclusionList', []) || [];
    lodash.set(state, 'processData.policyExclusionList', [
      ...ownExclusionList,
      ...addPopExclusionList,
    ]);
  } else {
    const coverageList = state.processData.coverageList;
    for (const coverageItem of coverageList) {
      const matchInsured = !clientId || insuredMatch(coverageItem, [{ clientId }]);

      if (coverageItem.coreCode === productCode && matchInsured) {
        if (!coverageItem.coverageExclusionList) {
          coverageItem.coverageExclusionList = [];
        }
        addPopExclusionList.map((exclusion) => {
          coverageItem.coverageExclusionList.push(exclusion);
          addCopy(state, {
            copyItem: exclusion,
            isLoading: false,
            coreCode: coverageItem.coreCode,
            clientId,
          });
        });
      }
    }
  }
};
