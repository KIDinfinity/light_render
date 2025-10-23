import { produce } from 'immer';
import lodash from 'lodash';
const removeUploadDocumentsModalUploadFiles = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = action?.payload?.id;
    if (!id) return;
    const uploadFiles = state?.uploadDocumentsModal?.uploadFiles || [];
    const fileId = lodash.find(uploadFiles, (item) => item.id === id)?.fileId;

    const ocrResultList = state?.uploadDocumentsModal?.ocrResultList || [];

    draftState.uploadDocumentsModal.ocrResultList = lodash.filter(
      ocrResultList,
      (item: any) => item?.docDataId !== fileId
    );
    draftState.uploadDocumentsModal.uploadFiles = lodash.filter(
      uploadFiles,
      (item: any) => item?.id !== id
    );
  });
  return { ...nextState };
};

export default removeUploadDocumentsModalUploadFiles;
