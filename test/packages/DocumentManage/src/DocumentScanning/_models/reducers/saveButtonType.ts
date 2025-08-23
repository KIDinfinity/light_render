import { produce }  from 'immer';

const saveButtonType = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { type } = action.payload;
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.type = type;
  });
  return { ...nextState };
};

export default saveButtonType;
