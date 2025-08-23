import { produce }  from 'immer';

const saveSerialClaimList = (state: any, action: any) => {
  const {} = action.payload;

  const nextState = produce(state, (draftState) => {});

  return { ...nextState };
};

export default saveSerialClaimList;
