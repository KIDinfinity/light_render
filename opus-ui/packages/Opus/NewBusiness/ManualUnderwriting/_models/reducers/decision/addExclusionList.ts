import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { addPopExclusionList } = lodash.pick(action?.payload, ['addPopExclusionList']);
  const productCode = formUtils.queryValue(lodash.get(state, 'productSection.productName'));
  const insured = formUtils.queryValue(lodash.get(state, 'productSection.name'));
  const nextState = produce(state, (draftState: any) => {
    let ownExclusionList: any = [];
    if (productCode === 'All') {
      ownExclusionList = lodash.get(draftState, 'processData.policyExclusionList', []) || [];
      lodash.set(draftState, 'processData.policyExclusionList', [
        ...ownExclusionList,
        ...addPopExclusionList,
      ]);
    } else {
      lodash.set(
        draftState,
        'processData.coverageList',
        lodash.map(lodash.get(draftState, 'processData.coverageList'), (item: any) => {
          const matchInsuredTarget = (() => {
            if (insured) {
              return lodash
                .chain(item)
                .get('coverageInsuredList', [])
                .some((insuredItem: any) => insuredItem?.clientId === insured)
                .value();
            }
            return true;
          })();
          if (item.coreCode === productCode && matchInsuredTarget) {
            const coverageExclusionList = lodash.get(item, 'coverageExclusionList') || [];
            return {
              ...item,
              coverageExclusionList: [...coverageExclusionList, ...addPopExclusionList],
            };
          }
          return item;
        })
      );
    }
  });
  return {
    ...nextState,
  };
};
