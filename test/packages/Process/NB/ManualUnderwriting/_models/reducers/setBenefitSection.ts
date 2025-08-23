import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const {
    changedFields,
    id: coverageId,
    productCode,
    isAddProductExclusion,
  } = lodash.pick(action?.payload, ['changedFields', 'id', 'productCode', 'isAddProductExclusion']);

  const nextState = produce(state, (draftState: any) => {
    if (coverageId) {
      const ownCoverageList =
        lodash.get(draftState, 'businessData.policyList[0].coverageList', []) || [];
      const dataItem = lodash
        .chain(ownCoverageList)
        .find((item: any) => item?.id === coverageId)
        .get('coverageDecision')
        .value();
      const index = lodash
        .chain(ownCoverageList)
        .findIndex((item: any) => item?.id === coverageId)
        .value();
      if (!isAddProductExclusion) {
        lodash.set(
          draftState,
          `businessData.policyList[0].coverageList[${index}].coverageDecision`,
          {
            ...dataItem,
            uwDecision: 'NS',
          }
        );
      }
      if (lodash.size(changedFields) === 1) {
        lodash.set(
          draftState,
          `businessData.policyList[0].coverageList[${index}].coverageDecision`,
          {
            ...dataItem,
            ...changedFields,
          }
        );
      }
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
                coverageDecision: {
                  ...item.coverageDecision,
                  uwDecision: 'NS',
                },
              };
            }
            return item;
          }
        )
      );
    }
  });
  return {
    ...nextState,
  };
};
