import lodash from 'lodash';
import { produce }  from 'immer';

const saveInsuredList = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { insuredSectionIndex, insuredList } = action.payload;
    // eslint-disable-next-line no-param-reassign
    draftState.insuredList = insuredList;
    draftState.insuredSectionIndex = lodash.isNil(insuredSectionIndex)
      ? state.insuredSectionIndex
      : insuredSectionIndex;
  });
  return { ...nextState };
};

export default saveInsuredList;
