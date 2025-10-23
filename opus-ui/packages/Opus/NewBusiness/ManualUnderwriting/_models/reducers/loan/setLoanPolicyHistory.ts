import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    loanHistoryList: any[];
    id: string;
  };
};

export default (state: any, action: TAction) => {
  const { id, loanHistoryList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const index = draftState.processData.loanDetailList.findIndex((item: any) => {
      return item?.id === id;
    });

    if (index > -1) {
      draftState.processData.loanDetailList[index] = {
        ...draftState.processData.loanDetailList[index],
        loanHistoryList,
      };
    }
  });
  return { ...nextState };
};
