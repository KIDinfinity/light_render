import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { systemStatus } = payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    // draftState.systemStatus = 'done';
    draftState.systemStatus = systemStatus;
  });

  return { ...nextState };
};
