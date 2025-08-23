import { produce } from 'immer';

export default (state, { payload }) => {
  const { id } = payload;
  return produce(state, (draftState) => {
    const payableItem = draftState.claimEntities?.claimPayableListMap?.[id];
    payableItem.fixDenyReason = true;
  });
};
