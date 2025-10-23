import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) => {
  const { uploadFiles = [] } = payload || [];
  return produce(state, (draftState: any) => {
    draftState.processData.uploadDocuments.uploadDocList = [
      ...(draftState.processData.uploadDocuments.uploadDocList || []),
      ...formUtils.cleanValidateData(uploadFiles),
    ];
  });
};
