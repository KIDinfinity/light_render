import { produce }  from 'immer';
import lodash from 'lodash';
import type { StateModel, UploadFileModel } from '../../_dto/model';

/**
 * 更新document数据
 */
export default (state: any, { payload = {} }: any) => {
  return produce(state, (draftState: any) => {
    const draft: StateModel = draftState;
    const { uploadFiles } = draft;

    draft.uploadFiles = lodash.map(uploadFiles, (uploadFile: UploadFileModel) => {
      const { fileId } = uploadFile;
      const image = payload[fileId as string];

      if (image) {
        // lodash.set(uploadFile, 'image', image);
        return {
          ...uploadFile,
          ...lodash.pick(payload, [
            'docTypeCode',
            'indexClass',
            'formCategory',
            'receivedDate',
          ]),
          image,
        };
      }
      return uploadFile
    });
  });
};
