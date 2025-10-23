import { produce } from 'immer';
import { get, find, set, forEach } from 'lodash';

const updateUploadDocumentsModalUploadFiles = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { id, updateData = {} } = action?.payload;

    if (!id) return;

    const uploadFiles = get(draftState, `uploadDocumentsModal.uploadFiles`, []);
    const targetFile = find(uploadFiles, (file) => file.id === id);

    if (targetFile) {
      forEach(updateData, (value, index) => {
        set(targetFile, index, value);
      });
    }
  });
  return { ...nextState };
};

export default updateUploadDocumentsModalUploadFiles;
