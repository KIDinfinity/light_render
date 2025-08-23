import { produce } from 'immer';

export default function savePreivewForm(state: any, { payload }) {
  const { previewForm } = payload;
  return produce(state, (draftState: any) => {
    draftState.previewForm = { ...draftState.previewForm, ...previewForm };
  });
}
