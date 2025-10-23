import { produce } from 'immer';

const saveInsured = (state: any, action: any) => {

  const { finalChangedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...finalChangedFields,
    };
  });
  return { ...nextState };
};

export default saveInsured;
