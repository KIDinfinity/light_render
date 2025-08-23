import { produce }  from 'immer';
import get from 'lodash/get';
import find from 'lodash/find';
import set from 'lodash/set';

export default (state: any, { payload }: any) => {
  const { sectionIndex, id, fileId, image } = payload;
  const nextState = produce(state, (draftState) => {
    const uploadFiles = get(draftState, `claimProcessData[${sectionIndex}].uploadFiles`, []);
    const targetFile = find(uploadFiles, (file) => file.id === id);
    if (targetFile) {
      set(targetFile, 'fileId', fileId);
      set(targetFile, 'image', image);
    }
  });

  return { ...nextState };
};
