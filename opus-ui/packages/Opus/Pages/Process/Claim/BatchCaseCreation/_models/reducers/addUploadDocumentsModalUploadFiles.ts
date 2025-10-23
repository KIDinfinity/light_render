import { produce } from 'immer';

const addUploadDocumentsModalUploadFiles = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.uploadDocumentsModal.uploadFiles = [
      ...state?.uploadDocumentsModal?.uploadFiles,
      ...(action?.payload?.addUploadFiles || []),
    ];
  });
  return { ...nextState };
};

export default addUploadDocumentsModalUploadFiles;
