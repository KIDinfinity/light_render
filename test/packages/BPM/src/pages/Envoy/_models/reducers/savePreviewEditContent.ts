import { produce } from 'immer';

export default function savePreviewEditContent(state: any, { payload }: any) {
  const { previewEditContent } = payload;

  return produce(state, (draftState: any) => {
    draftState.previewEditContent = { ...draftState.previewEditContent, ...previewEditContent };
  });
}
