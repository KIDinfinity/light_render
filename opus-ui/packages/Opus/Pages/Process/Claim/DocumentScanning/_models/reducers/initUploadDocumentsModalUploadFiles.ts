import { produce } from 'immer';

const initUploadDocumentsModalUploadFiles = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.uploadDocumentsModal.uploadFiles = [];
    draftState.uploadDocumentsModal.ocrResultList = [];
  });
  return { ...nextState };
};

export default initUploadDocumentsModalUploadFiles;
