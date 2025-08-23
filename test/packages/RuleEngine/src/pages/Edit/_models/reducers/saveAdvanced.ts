import { produce }  from 'immer';

const saveAdvanced = (state: any, action: any) => {
  const { isAdvanced } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.isAdvanced = isAdvanced;
  });

  return { ...nextState };
};

export default saveAdvanced;
