import { produce } from 'immer';

const saveSourceSystem = (state: any, action: any) => {
  const { policySource } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData = {
      ...draftState.businessData,
      insured: {
        ...(draftState.businessData?.insured || {}),
        policySource,
      },
    };
  });

  return { ...nextState };
};

export default saveSourceSystem;
