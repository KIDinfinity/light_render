import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { websocketKickOutTime } = payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.websocketKickOutTime = websocketKickOutTime;
  });

  return { ...nextState };
};
