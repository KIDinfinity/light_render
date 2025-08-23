import { produce } from 'immer';

const updateShowModalStatus = (state: any, action: any) => {
  const { showModalStatus } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.showModalStatus = showModalStatus;
    })

  return { ...nextState };
};

export default updateShowModalStatus;
