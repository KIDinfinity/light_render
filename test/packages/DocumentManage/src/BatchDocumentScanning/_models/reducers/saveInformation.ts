import { produce }  from 'immer';
import get from 'lodash/get';
import set from 'lodash/set';

const saveInformation = (state: any, { payload }: any) => {
  const { sectionIndex, changedFields } = payload;
  const nextState = produce(state, (draftState: any) => {
    const indexInformation = get(draftState, `claimProcessData[${sectionIndex}]`, {});
    const newInformation = {
      ...indexInformation,
      ...changedFields,
    };
    set(draftState, `claimProcessData[${sectionIndex}]`, newInformation);
  });
  return { ...nextState };
};

export default saveInformation;
