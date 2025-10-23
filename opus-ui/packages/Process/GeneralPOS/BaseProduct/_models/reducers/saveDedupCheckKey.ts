import { produce } from 'immer';

const saveDictObject = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.dedupCheckKey = action?.payload;
  });

  return { ...nextState };
};

export default saveDictObject;
