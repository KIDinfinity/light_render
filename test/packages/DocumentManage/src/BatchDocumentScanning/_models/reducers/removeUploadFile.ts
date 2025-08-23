import remove from 'lodash/remove';
import { produce }  from 'immer';
import get from 'lodash/get';
import set from 'lodash/set';

export default (state: any, { payload }: any) => {
  const { sectionIndex, id } = payload;
  const nextState = produce(state, (draftState) => {
    const uploadFiles = get(draftState, `claimProcessData[${sectionIndex}].uploadFiles`, []);
    remove(uploadFiles, (fileData) => fileData.id === id);
    set(draftState, `claimProcessData[${sectionIndex}].uploadFiles`, uploadFiles);
  });
  return { ...nextState };
};
