import { produce }  from 'immer';

const saveError = (state: any, action: any) => {
  const { errorMap } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.error = errorMap;
  });

  return { ...nextState };
};

export default saveError;
