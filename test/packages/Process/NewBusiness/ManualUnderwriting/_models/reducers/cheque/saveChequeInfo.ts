import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData.chequeInfoList = lodash
      .chain(draftState.modalData.processData.chequeInfoList)
      .map((el: any) => {
        return el.id === id ? { ...el, ...changedFields } : el;
      })
      .value();
  });
  return {
    ...nextState,
  };
};
