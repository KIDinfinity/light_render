import { produce } from 'immer';
import lodash from 'lodash';

const removeUploadDocList = (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const { fileId } = payload || {};

    draftState.processData.uploadDocuments.uploadDocList = lodash.filter(
      draftState.processData.uploadDocuments.uploadDocList,
      (item: any) => item.fileId !== fileId
    );
  });
};

export default removeUploadDocList;
