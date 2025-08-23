import { produce } from 'immer';

export default (state: any) => {
  const newList = state?.modalData?.loanDetailList?.filter((item: any) => !item?.isLast) || [];
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData.loanDetailList = newList;
  });
  return { ...nextState };
};
