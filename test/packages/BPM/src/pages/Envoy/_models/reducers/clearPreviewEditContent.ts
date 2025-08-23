import { produce } from 'immer';

export default function clearPreviewEditContent(state: any) {
  return produce(state, (draftState: any) => {
    draftState.previewEditContent = {};
  });
}
