import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (changedFields.privateFundFlag?.value === 'N') {
      const policyDetail = draftState.businessData?.policyList[0];
      draftState.businessData.policyList[0] = {
        ...policyDetail,
        rebalancingType: null,
      };
    }
  });

  return { ...nextState };
};
