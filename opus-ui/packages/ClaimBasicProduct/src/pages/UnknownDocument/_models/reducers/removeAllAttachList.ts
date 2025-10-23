import { produce } from 'immer';

const removeAllAttachList = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.attachList = [];
  });

  return { ...nextState };
};

export default removeAllAttachList;
