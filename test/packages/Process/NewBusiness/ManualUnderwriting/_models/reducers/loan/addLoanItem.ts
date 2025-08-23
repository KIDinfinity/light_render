import { produce } from 'immer';
import { v4 as uuid } from 'uuid';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    if (!draftState.modalData.loanDetailList) {
      draftState.modalData.loanDetailList = [
        {
          id: uuid(),
          isLast: true,
        },
      ];
    } else {
      draftState.modalData.loanDetailList.push({
        id: uuid(),
        isLast: true,
      });
    }
  });
  return { ...nextState };
};
