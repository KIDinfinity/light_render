import lodash from 'lodash';
import { produce } from 'immer';

export default (state, { payload }) => {
  const nextState = produce(
    state,
    (draftState: { uploadDocumentsModal: { ocrResultList: any[]; uploadFiles: any[] } }) => {
      const ocrResultList =
        payload.ocrResultList?.filter((result: any) => Boolean(result?.success)) || [];

      let newUploadFiles = state?.uploadDocumentsModal?.uploadFiles;

      const dropdownConfig = state?.dropdownConfigure;
      newUploadFiles = newUploadFiles.map((f) => {
        const newFile = lodash.clone(f);
        const ocrIndex = lodash.findIndex(ocrResultList, (r: any) => r?.docDataId === f?.fileId);
        if (ocrIndex > -1 && lodash.isNil(f?.documentFileId)) {
          newFile.documentFileId = lodash?.find(dropdownConfig, {
            docTypeCode: ocrResultList?.[ocrIndex]?.ocrResult?.docTypeCode,
          })?.id;
        }
        return newFile;
      });

      const filteredResult =
        state.uploadDocumentsModal.ocrResultList?.filter(
          (current: any) => !ocrResultList.some((res: any) => res.docDataId === current.docDataId)
        ) || [];

      draftState.uploadDocumentsModal.ocrResultList = [...filteredResult, ...ocrResultList];

      draftState.uploadDocumentsModal.uploadFiles = newUploadFiles;
    }
  );
  return { ...nextState };
};
