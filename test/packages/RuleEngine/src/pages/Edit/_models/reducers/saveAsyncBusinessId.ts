import { produce }  from 'immer';

const saveAsyncBusinessId = (state: any, action: any) => {
  const { asyncBusinesssId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    /* eslint-disable */
    draftState.asyncBusinesssId = asyncBusinesssId;
  });
  return { ...nextState };
};

export default saveAsyncBusinessId;
