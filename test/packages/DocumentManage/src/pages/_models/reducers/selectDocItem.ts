import { produce }  from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { selectedDocId, selectedId } = payload;
    draft.selectedDocId = selectedDocId;
    draft.selectedId = selectedId;
  });
};
