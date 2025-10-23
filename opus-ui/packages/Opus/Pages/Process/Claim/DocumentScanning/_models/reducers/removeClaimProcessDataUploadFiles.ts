import { produce } from 'immer';
import { get, set, remove, find } from 'lodash';

const removeClaimProcessDataUploadFiles = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { id } = payload;

    if (!id) return;

    const uploadFiles = get(draftState, `businessData.claimProcessData[0].uploadFiles`, []);
    const ocrResultList = get(draftState, `businessData.claimProcessData[0].ocrResultList`, []);

    const fileId = find(uploadFiles, (item) => item.id === id)?.fileId;

    remove(ocrResultList, (fileData: any) => fileData.docDataId === fileId);
    remove(uploadFiles, (fileData: any) => fileData.id === id);

    set(draftState, `businessData.claimProcessData[0].ocrResultList`, ocrResultList);
    set(draftState, `businessData.claimProcessData[0].uploadFiles`, uploadFiles);
  });
  return { ...nextState };
};

export default removeClaimProcessDataUploadFiles;
