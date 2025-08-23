import { produce }  from 'immer';
import lodash from 'lodash';

const updateOpTreatmentList = (state: any, action: any) => {
  const { index } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;

    if (lodash.toString(index) === '-1') {
      draft.opTreatmentList = [];
      return;
    }

    lodash.remove(draft?.opTreatmentList, (value, ind) => {
      return ind === index;
    });
    draft.opTreatmentList = [...draft.opTreatmentList];
  });

  return { ...nextState };
};

export default updateOpTreatmentList;
