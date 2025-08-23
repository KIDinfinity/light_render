import { produce }  from 'immer';

const saveEditData = (state: any, action: any) => {
  const { editData } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.editData = editData;
  });

  return { ...nextState };
};

export default saveEditData;
