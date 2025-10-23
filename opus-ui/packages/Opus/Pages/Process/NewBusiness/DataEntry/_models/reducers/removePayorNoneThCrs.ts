import { produce } from 'immer';

export default (state, action) => {
  const { id } = action?.payload || {};
  return produce(state, (draftState) => {
    draftState.processData.payorCrs.nonThCrsList =
      draftState.processData.payorCrs.nonThCrsList.filter((noneThCrs) => noneThCrs.id !== id);
  });
};
