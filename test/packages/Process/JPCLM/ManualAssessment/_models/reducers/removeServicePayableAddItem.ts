import { produce }  from 'immer';

const removeServicePayableAddItem = (state: any, action: any) => {
  const nextState = produce(state, (draftState) => {
    draftState.servicePayableAddItem = null;
  });

  return { ...nextState };
};

export default removeServicePayableAddItem;
