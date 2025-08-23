import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const {
    value,
    coverageId,
    productCode,
    changedFields,
    isAddProductExclusion,
  } = lodash.pick(action?.payload, [
    'value',
    'coverageId',
    'productCode',
    'changedFields',
    'isAddProductExclusion',
  ]);
  const { businessData } = state;
  const ownCoverageList = lodash.get(businessData, 'policyList[0].coverageList', []) || [];
  let ownCoverageItem: any;
  let index: any;

  if (coverageId) {
    ownCoverageItem = lodash.find(ownCoverageList, (item: any) => item?.id === coverageId);
    index = lodash.findIndex(ownCoverageList, (item: any) => item?.id === coverageId);
  }

  const nextState = produce(state, (draftState: any) => {
    if (value) {
      if (value === 'NS') {
        if (coverageId && (!isAddProductExclusion || lodash.size(changedFields) === 1)) {
          lodash.set(draftState, `businessData.policyList[0].coverageList[${index}]`, {
            ...ownCoverageItem,
            isShowLoading: true,
          });
        }
        if (productCode && isAddProductExclusion) {
          lodash.set(
            draftState,
            'businessData.policyList[0].coverageList',
            lodash.map(
              lodash.get(draftState, 'businessData.policyList[0].coverageList'),
              (item: any) => {
                if (item.coreCode === productCode) {
                  return {
                    ...item,
                    isShowLoading: true,
                  };
                }
                return item;
              }
            )
          );
        }
      } else {
        lodash.set(draftState, `businessData.policyList[0].coverageList[${index}]`, {
          ...ownCoverageItem,
          isShowLoading: false,
        });
      }
    }
  });
  return { ...nextState };
};
