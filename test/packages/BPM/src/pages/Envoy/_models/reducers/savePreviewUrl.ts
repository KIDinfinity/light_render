import { produce } from 'immer';

export default function savePreviewUrl(state: any, { payload }: any) {
  const { previewUrl } = payload;

  return produce(state, (draftState: any) => {
    draftState.previewUrl = previewUrl || '';
  });
}
