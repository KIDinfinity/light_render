import { produce }  from 'immer';

const removeRules = (state: any, action: any) => {
  const { id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.editData.results = draftState.editData.results.filter((el) => el.id !== id);
  });

  return { ...nextState };
};

export default removeRules;
