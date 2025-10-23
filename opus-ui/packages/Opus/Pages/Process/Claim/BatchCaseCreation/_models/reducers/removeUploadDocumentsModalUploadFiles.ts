import { produce } from 'immer';
import lodash from 'lodash';
const removeUploadDocumentsModalUploadFiles = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = action?.payload?.id;
    if (!id) return;
    const uploadFiles = state?.uploadDocumentsModal?.uploadFiles || [];

    draftState.uploadDocumentsModal.uploadFiles = lodash.filter(
      uploadFiles,
      (item: any) => item?.id !== id
    );
  });
  return { ...nextState };
};

export default removeUploadDocumentsModalUploadFiles;
