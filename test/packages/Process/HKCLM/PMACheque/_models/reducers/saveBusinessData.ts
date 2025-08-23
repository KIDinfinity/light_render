import { produce } from 'immer';

export default (state: any, action: any) => {
  const { businessData, isAssurance } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (isAssurance) {
      if (!businessData.chequeCase) businessData.chequeCase = {};
      businessData.chequeCase.costCentre = 'PCP';
      businessData.chequeCase.currency = 'HKD';
    }
    draftState.businessData = businessData;
  });
  return { ...nextState };
};
