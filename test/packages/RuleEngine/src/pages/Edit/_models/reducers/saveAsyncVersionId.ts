import { produce }  from 'immer';

const saveAsyncVersionId = (state: any, action: any) => {
  const { asyncVersionId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    /* eslint-disable */
    draftState.asyncVersionId = asyncVersionId;
  });
  return { ...nextState };
};

export default saveAsyncVersionId;
