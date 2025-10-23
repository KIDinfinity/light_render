import { produce } from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { voiding, voidDocumentItem } = payload;
    draft.voiding = voiding;
    if (!!voidDocumentItem) {
      draft.voidDocumentItem = voidDocumentItem;
    }
  });
};
