import { produce } from 'immer';

export default function saveSelectEnclosureEdit(state: any, { payload }: any) {
  const { previewSelectEnclosureEdit } = payload;

  return produce(state, (draftState: any) => {
    draftState.previewSelectEnclosureEdit = previewSelectEnclosureEdit;
  });
}
