import { produce } from 'immer';
import { JPTREATMENTDATE } from '@/utils/claimConstant';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';

const initDateOfTreatment = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.each(draftState.claimEntities.jpMedicineTreatmentListMap, (item) => {
      if (!item.jpTreatmentDateList) {
        const uuid = uuidv4();
        const addDateOfTreatmentItem = {
          ...JPTREATMENTDATE,
          claimNo: item.claimNo,
          id: uuid,
          treatmentId: item.treatmentId,
          medicineId: item.id,
        };
        item.jpTreatmentDateList = [uuid];
        draftState.claimEntities.jpTreatmentDateListMap[uuid] = addDateOfTreatmentItem;
      }
    });
  });

  return { ...nextState };
};

export default initDateOfTreatment;
