import { produce } from 'immer';

const addPayeeItem = (state: any, action: any) => {
  const { addPayeeItem } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.claimProcessData.payeeList = [
      ...draftState.claimProcessData.payeeList,
      addPayeeItem.id,
    ];
    draftState.claimEntities.payeeListMap[addPayeeItem.id] = addPayeeItem;
  });

  return { ...nextState };
};

export default addPayeeItem;
