import { produce }  from 'immer';
import lodash from 'lodash';

const addOpTreatmentList = (state: any, action: any) => {
  const { date } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.opTreatmentList = lodash.compact([...(draftState.opTreatmentList || ''), date]);
  });
  return { ...nextState };
};

export default addOpTreatmentList;
