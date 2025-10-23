import { produce } from 'immer';
import lodash from 'lodash';
import type { UploadFileModel } from 'packages/Opus/Modules/Document/_dto/model';

const removeUploadSuccessFile = (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    if (payload?.fileId) {
      const list = lodash.filter(
        draftState.processData.uploadDocuments.uploadDocList,
        (file: UploadFileModel) => file.fileId !== payload.fileId
      );
      draftState.processData.uploadDocuments.uploadDocList = list;
    } else {
      lodash.set(draftState, 'processData.uploadDocuments.uploadDocList', [])
    }
  });
};

export default removeUploadSuccessFile;
