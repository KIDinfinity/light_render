import { produce } from 'immer';

export default function saveSelectEnclosureIndex(state: any, { payload }: any) {
  const { index } = payload;

  return produce(state, (draftState: any) => {
    draftState.previewSelectEnclosureIndex = index;
  });
}
