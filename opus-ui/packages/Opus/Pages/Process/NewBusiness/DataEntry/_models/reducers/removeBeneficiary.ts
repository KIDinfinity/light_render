import { produce } from 'immer';

export default (state, action) => {
  const { id } = action?.payload || {};
  return produce(state, draftState => {
    draftState.processData.beneficiaries = draftState.processData.beneficiaries.filter((beneficiary) => beneficiary.id !== id);
  })
}