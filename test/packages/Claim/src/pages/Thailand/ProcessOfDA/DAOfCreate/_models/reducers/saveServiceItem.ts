import { produce } from 'immer';

const saveServiceItem = (state: any, action: any) => {
  const { serviceItemId, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...state.claimEntities.serviceItemListMap[serviceItemId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveServiceItem;
