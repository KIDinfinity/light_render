import { produce } from 'immer';

const saveInsured = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.insured = {
      ...draftState.businessData.insured,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveInsured;
