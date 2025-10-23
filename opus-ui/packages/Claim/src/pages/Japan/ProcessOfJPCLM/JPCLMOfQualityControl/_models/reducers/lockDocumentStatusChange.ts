import { produce } from 'immer';

export default (state: any) => {
  return produce(state, (draft: any) => {
    draft.documentStatusChangeStatus = true;
  });
};
