import { produce } from 'immer';

const saveLifePayable = (state: any, action: any) => {
  const { claimEntities } = state;
  const { changedFields, incidentPayableId } = action.payload;
  const incidentPayableItem = claimEntities.claimPayableListMap[incidentPayableId];
  const editPayableItem = {
    ...incidentPayableItem,
    lifePayable: {
      ...incidentPayableItem.lifePayable,
      ...changedFields,
    },
  };

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.claimEntities.claimPayableListMap[incidentPayableId] = editPayableItem;
  });

  return { ...nextState };
};

export default saveLifePayable;
