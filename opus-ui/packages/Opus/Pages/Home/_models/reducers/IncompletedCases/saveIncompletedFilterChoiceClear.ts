import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { fieldName } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    draftState.incompleteCases.filterChoice = !fieldName
      ? {}
      : {
          ...draftState.incompleteCases.filterChoice,
          [fieldName]: [],
        };
  });
  return { ...nextState };
};
