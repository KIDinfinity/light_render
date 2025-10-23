import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';

const firstTreatmentDateAdd = (state: any, action: any) => {
  const { otherProcedureId, treatmentDates } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList =
      lodash.map(treatmentDates, (time) => ({
        firstTreatmentDate: moment(time).format(),
      }));
  });

  return nextState;
};

export default firstTreatmentDateAdd;
