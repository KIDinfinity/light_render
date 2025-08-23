import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import {v4 as uuidv4 } from 'uuid';

const saveOpTreatmentList = (state: any, action: any) => {
  const { treatmentId, opTreatmentList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const opTreatmentListObj = lodash
      .chain(opTreatmentList)
      .map((outpatientTreatmentDate) => {
        return {
          claimNo: draftState?.claimProcessData?.claimNo,
          treatmentId,
          outpatientTreatmentDate,
          id: uuidv4(),
        };
      })
      .value();

    draftState.claimEntities.treatmentListMap[treatmentId].opTreatmentList = lodash.orderBy(
      [
        ...(draftState.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList || ''),
        ...(opTreatmentListObj || ''),
      ],
      (item) => moment(item.outpatientTreatmentDate).valueOf(),
      ['asc']
    );
  });

  return { ...nextState };
};

export default saveOpTreatmentList;
