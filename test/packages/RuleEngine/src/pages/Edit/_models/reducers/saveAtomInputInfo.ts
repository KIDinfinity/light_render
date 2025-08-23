import { produce }  from 'immer';

const saveAtomInputInfo = (state: any, action: any) => {
  const { list } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    /* eslint-disable */
    draftState.atomInputInfo = [...draftState.atomInputInfo, ...list];
  });
  return { ...nextState };
};

export default saveAtomInputInfo;
