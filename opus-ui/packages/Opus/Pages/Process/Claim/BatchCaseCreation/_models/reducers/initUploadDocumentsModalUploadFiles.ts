import { produce } from 'immer';

const initUploadDocumentsModalUploadFiles = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.uploadDocumentsModal.uploadFiles = [];
    draftState.batchCreateCaseSubmit = {};
  });
  return { ...nextState };
};

export default initUploadDocumentsModalUploadFiles;
