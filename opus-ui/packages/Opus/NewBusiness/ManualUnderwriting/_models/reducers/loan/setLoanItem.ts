import { produce } from 'immer';

type TAction = {
  type: any;
  payload: any;
};

export default (state: any, action: TAction) => {
  const { loanData } = action.payload;
  const { id } = loanData;
  const nextState = produce(state, (draftState: any) => {
    const index = draftState.modalData.loanDetailList.findIndex((item: any) => {
      return item?.id === id;
    });

    if (index > -1) {
      draftState.modalData.loanDetailList[index] = {
        ...draftState.modalData.loanDetailList[index],
        ...loanData,
      };
    }
  });
  return { ...nextState };
};
