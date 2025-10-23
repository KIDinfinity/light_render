import { produce } from 'immer';

export default (state, action) => {
  const { id } = action?.payload || {};
  return produce(state, (draftState) => {
    draftState.processData.insuredCrs.nonThCrsList =
      draftState.processData.insuredCrs.nonThCrsList.filter((noneThCrs) => noneThCrs.id !== id);
  });
};
