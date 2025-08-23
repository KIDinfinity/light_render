import { produce } from 'immer';
import setClaimant from '../functions/setClaimant';

const saveInsured = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.insured = {
      ...state.claimProcessData.insured,
      ...changedFields,
    };
    draftState.claimProcessData.claimant = {
      ...state.claimProcessData.claimant,
    };
  });
  setClaimant(nextState);
  return { ...nextState };
};

export default saveInsured;
