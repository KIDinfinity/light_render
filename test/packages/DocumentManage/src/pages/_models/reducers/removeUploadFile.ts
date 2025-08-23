import { produce }  from 'immer';
import lodash from 'lodash';
import type { UploadFileModel } from '../../_dto/model';

const removeUploadFile = (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { uploadFiles } = draft;
    if (lodash.isArray(payload) && payload.length) {
      draft.uploadFiles = lodash.filter(
        uploadFiles,
        (file: UploadFileModel) => !payload.includes(file.fileId)
      );
    } else {
      draft.uploadFiles = [];
    }
  });
};

export default removeUploadFile;
