import { produce } from 'immer';
import lodash from 'lodash';

type TAction = {
  type: any;
  payload: {
    newId: string;
    isLast?: boolean;
  };
};

export default (state: any, action: TAction) => {
  const { newId, isLast } = action?.payload;
  const newRow = {
    id: newId,
    isLast,
  };
  const old = state.modalData.fund.fundList;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'modalData.fund.fundList', {
      ...old,
      [newRow.id]: newRow,
    });
  });
  return { ...nextState };
};
