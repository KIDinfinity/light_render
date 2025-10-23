import { produce } from 'immer';

const serviceUpdate = (state: any, action: any) => {
  const { nameScreeningVisible } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.nameScreeningVisible = nameScreeningVisible;
  });

  return { ...nextState };
};

export default serviceUpdate;
