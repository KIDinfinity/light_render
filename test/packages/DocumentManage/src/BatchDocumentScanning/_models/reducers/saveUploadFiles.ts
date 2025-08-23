import { produce }  from 'immer';
import get from 'lodash/get';
import set from 'lodash/set';

export default (state: any, { payload }: any) => {
  const { sectionIndex, uploadFiles } = payload;
  const nextState = produce(state, (draftState) => {
    const files = get(draftState, `claimProcessData[${sectionIndex}].uploadFiles`, []);
    set(draftState, `claimProcessData[${sectionIndex}].uploadFiles`, [...files, ...uploadFiles]);
  });
  return { ...nextState };
};
