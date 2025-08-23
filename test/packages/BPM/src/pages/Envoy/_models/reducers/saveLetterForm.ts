import { produce } from 'immer';

export default function changePreivewModeShow(state: any, { payload }: any) {
  const { changedFields } = payload;

  return produce(state, (draftState: any) => {
    const currentLetter = draftState.previewModeData?.letters?.[draftState.previewSelectLetter];
    currentLetter.after.params = {
      ...currentLetter.after?.params,
      ...changedFields,
    };
    draftState.isChange = true;
  });
}
