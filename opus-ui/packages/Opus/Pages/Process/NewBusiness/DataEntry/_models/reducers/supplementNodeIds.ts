import { produce } from 'immer';
import lodash from 'lodash';
import type { StateModel, UploadFileModel } from 'packages/Opus/Modules/Document/_dto/model';

/**
 * 更新document数据
 */
export default (state: any, { payload = {} }: any) => {
  const { fileId, docDataId, ...extra } = payload;
  return produce(state, (draftState: any) => {
    const draft: StateModel = draftState;
    const { uploadFiles } = draft;

    draft.uploadFiles = lodash.map(uploadFiles, (uploadFile: UploadFileModel) => {
      return fileId === uploadFile?.fileId
        ? {
            ...uploadFile,
            ...lodash.pick(extra, ['docTypeCode', 'indexClass', 'formCategory']),
            docDataId,
          }
        : uploadFile;
    });
  });
};
