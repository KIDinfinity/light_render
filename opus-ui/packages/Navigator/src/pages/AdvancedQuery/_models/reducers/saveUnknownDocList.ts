import { produce } from 'immer';

const saveActiveTaskList = (state: any, action: any) => {
  const { list } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.unKnownDoc = {
      ...draftState.unKnownDoc,
      ...list,
    };
  });
  return { ...nextState };
};

export default saveActiveTaskList;
