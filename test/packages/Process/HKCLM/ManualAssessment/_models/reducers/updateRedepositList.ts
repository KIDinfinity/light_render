import { produce } from 'immer';

const updateRedepositList = (state: any, action: any) => {
  const { payeeList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    payeeList.forEach((payeeItem: any) => {
      draftState.claimEntities.payeeListMap[payeeItem.id] = payeeItem;
    });
  });

  return { ...nextState };
};

export default updateRedepositList;
