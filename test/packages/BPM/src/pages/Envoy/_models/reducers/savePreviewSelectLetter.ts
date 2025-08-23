import { produce } from 'immer';

export default function savePreviewSelectLetter(state: any, { payload }: any) {
  const { index } = payload;

  return produce(state, (draftState: any) => {
    draftState.previewSelectLetter = index;
  });
}
