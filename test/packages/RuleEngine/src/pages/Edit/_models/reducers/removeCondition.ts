import { produce }  from 'immer';

const removeCondition = (state: any, action: any) => {
  const { id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.editData = {
      ...draftState.editData,
      conditions: draftState.editData.conditions?.filter((el) => el.id !== id),
    };
  });

  return { ...nextState };
};

export default removeCondition;
