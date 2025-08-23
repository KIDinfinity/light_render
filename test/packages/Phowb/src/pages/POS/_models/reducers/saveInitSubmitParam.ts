import { produce }  from 'immer';

const saveInitSubmitParam = (state: any, action: any) => {
  const { claimProcessData } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitInitParams = claimProcessData;
  });
  return { ...nextState };
};

export default saveInitSubmitParam;
