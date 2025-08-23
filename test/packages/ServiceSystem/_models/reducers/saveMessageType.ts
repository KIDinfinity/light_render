import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { messageType } = payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.messageType = messageType;
  });

  return { ...nextState };
};
