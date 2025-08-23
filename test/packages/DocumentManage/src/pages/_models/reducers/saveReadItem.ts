import { produce } from 'immer';
import type { ActionModel } from '../../_dto/model';

export default (state: any, { payload }: ActionModel) => {
  const { readItem } = payload;

  return produce(state, (draftSate: any) => {
    const draft = draftSate;
    draft.readItem = { ...draft.readItem, ...readItem };
  });
};
