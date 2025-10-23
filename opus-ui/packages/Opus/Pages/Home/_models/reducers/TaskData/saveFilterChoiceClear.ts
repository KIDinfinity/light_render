import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { fieldName } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    draftState.taskData.filterChoice = !fieldName
      ? {}
      : {
          ...draftState.taskData.filterChoice,
          [fieldName]: [],
        };
  });
  return { ...nextState };
};
