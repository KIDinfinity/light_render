import { produce } from 'immer';
import type { ActionModel } from '../../_dto/model';

export default (state: any, { payload }: ActionModel) => {
  const { searchValue } = payload;

  return produce(state, (draftSate: any) => {
    const draft = draftSate;
    draft.searchValue = searchValue;
  });
};
