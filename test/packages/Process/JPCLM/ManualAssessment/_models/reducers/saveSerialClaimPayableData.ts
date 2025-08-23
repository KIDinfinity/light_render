import { produce }  from 'immer';

const saveSerialClaimPayableData = (state: any, action: any) => {
  const {} = action.payload;

  const nextState = produce(state, (draftState) => {});

  return { ...nextState };
};

export default saveSerialClaimPayableData;
