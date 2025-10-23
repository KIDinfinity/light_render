import { produce } from 'immer';
import lodash, { isEmpty } from 'lodash';
import type { UploadFileModel } from 'packages/Opus/Modules/Document/_dto/model';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { uploadFiles } = draft;
    const { documentInfo, uploadFile } = payload;
    draft.uploadFiles = lodash.map(uploadFiles, (file: UploadFileModel) => {
      if (uploadFile.fileId === file.fileId) {
        const fileTemp = { ...file };
        if (lodash.keys(documentInfo).length === 1) {
          if (lodash.has(documentInfo, 'indexClass')) {
            if (!isEmpty(formUtils.queryValue(fileTemp.formCategory))) {
              fileTemp.formCategory = '';
            }
            if (!isEmpty(formUtils.queryValue(fileTemp.docTypeCode))) {
              fileTemp.docTypeCode = '';
            }
          }
          if (
            lodash.has(documentInfo, 'formCategory') &&
            !isEmpty(formUtils.queryValue(fileTemp.docTypeCode))
          ) {
            fileTemp.docTypeCode = '';
          }
          if (lodash.has(documentInfo, 'documentFileId')) {
            const targetConfigure = lodash.find(
              draft.dropdownConfigure,
              (item) => item.id === formUtils.queryValue(documentInfo.documentFileId)
            );
            const {
              docTypeCode,
              formCategory,
              externalDocTypeCode,
              indexClass,
            } = lodash.pick(targetConfigure, [
              'docTypeCode',
              'formCategory',
              'externalDocTypeCode',
              'indexClass',
            ]);

            return {
              ...fileTemp,
              docTypeCode,
              formCategory,
              externalDocTypeCode,
              indexClass,
              documentFileId: documentInfo.documentFileId,
            };
          }
          return { ...fileTemp, ...documentInfo };
        }
        return { ...file, ...documentInfo };
      }
      return file;
    });
  });
};
