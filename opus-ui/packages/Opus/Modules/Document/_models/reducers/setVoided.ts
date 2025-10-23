import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { voided, voidDocumentItem } = payload;
    draft.voided = voided;
    if (!!voidDocumentItem) {
      draft.voidDocumentItem = voidDocumentItem;
    }
  });
};
