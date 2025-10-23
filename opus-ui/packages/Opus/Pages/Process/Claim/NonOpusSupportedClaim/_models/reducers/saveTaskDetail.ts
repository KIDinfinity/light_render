import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { taskDetail } = payload || {};

  const nextState = produce(state, (draftState: any) => {
    draftState.taskDetail = taskDetail;
  });

  return { ...nextState };
};
