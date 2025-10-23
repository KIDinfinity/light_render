import { produce } from 'immer';

const ocrResultVisible = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.ocrResultModal.visible = !state?.ocrResultModal?.visible;
  });
  return { ...nextState };
};

export default ocrResultVisible;
