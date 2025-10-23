import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { editVisit, documentEdit } = payload;
    draft.editVisit = editVisit;
    if (!!documentEdit) {
      draft.documentEdit = documentEdit;
    }
  });
};
