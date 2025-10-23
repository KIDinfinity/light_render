import { produce } from 'immer';

export default (state: any, action: any) => {
  const {
    namespace,
    getDataForSave,
    onFieldChange,
    saveClaim,
    clearClaim,
    dataMap,
  } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.config = {
      ...draftState.config,
      [namespace]: {
        getDataForSave,
        onFieldChange,
        saveClaim,
        clearClaim,
        dataMap,
      },
    };
  });

  return { ...nextState };
};
