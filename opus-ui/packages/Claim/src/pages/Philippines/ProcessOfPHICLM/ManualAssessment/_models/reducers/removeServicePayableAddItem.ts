import { produce } from 'immer';

const removeServicePayableAddItem = (state: any) => {
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.servicePayableAddItem = null;
  });

  return { ...nextState };
};

export default removeServicePayableAddItem;
