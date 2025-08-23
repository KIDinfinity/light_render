import { produce } from 'immer';
import type { ActionModel } from '../../_dto/model';

export default (state: any, { payload }: ActionModel) => {
  const { viewActived } = payload;

  return produce(state, (draftSate: any) => {
    const draft = draftSate;
    draft.viewActived = viewActived;
  });
};
