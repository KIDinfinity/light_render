import { produce } from 'immer';
import type { ActionModel } from '../actions/ActionModel';

export default (state: any, { payload }: ActionModel) => {
  const { force } = payload;

  return produce(state, (draftSate: any) => {
    const draft = draftSate;
    draft.force = force;
  });
};
