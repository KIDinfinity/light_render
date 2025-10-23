import { produce } from 'immer';
import { get, find, set, forEach, size } from 'lodash';

const updataClaimProcessDataUploadFiles = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState) => {
    const { id, updateData = {} } = payload;

    if (!id) return;

    const uploadFiles = get(draftState, `businessData.claimProcessData[0].uploadFiles`, []);
    const targetFile = find(uploadFiles, (file) => file.id === id);

    if (targetFile && size(updateData)) {
      forEach(updateData, (value, index) => {
        set(targetFile, index, value);
      });
    }
  });
  return { ...nextState };
};

export default updataClaimProcessDataUploadFiles;
