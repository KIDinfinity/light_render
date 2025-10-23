import { produce } from 'immer';

export default (state, action) => {
  return produce(state, draftState => {
    draftState.processData.productInfoBasicPlan = {};
  })
}