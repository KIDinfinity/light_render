import { produce }  from 'immer';
import get from 'lodash/get';
import set from 'lodash/set';
import remove from 'lodash/remove';

export default (state: any, { payload }: any) => {
  const { sectionIndex } = payload;

  const nextState = produce(state, (draftState) => {
    const claimProcessData = get(draftState, `claimProcessData`, []);
    const newData = remove(claimProcessData, (_, index) => index !== sectionIndex);
    set(draftState, 'claimProcessData', newData);
  });

  return { ...nextState };
};
