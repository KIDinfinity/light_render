import { produce } from 'immer';

const serviceUpdate = (state: any, action: any) => {
  const { serviceItemId, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!draftState.claimEntities) return;
    const item = draftState.claimEntities?.serviceItemListMap[serviceItemId];
    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...item,
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default serviceUpdate;
