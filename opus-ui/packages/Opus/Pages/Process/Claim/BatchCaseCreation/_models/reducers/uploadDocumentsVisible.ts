import { produce } from 'immer';

const uploadDocumentsVisible = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.uploadDocumentsModal.visible = !state?.uploadDocumentsModal?.visible;
  });
  return { ...nextState };
};

export default uploadDocumentsVisible;
