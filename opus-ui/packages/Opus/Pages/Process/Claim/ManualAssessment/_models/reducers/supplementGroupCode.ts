import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { treatmentId } = payload || {};

  const nextState = produce(state, (draftState: any) => {
    const treatmentItem = draftState?.claimEntities.treatmentListMap[treatmentId] || {};
    draftState.claimEntities.treatmentListMap[treatmentId].opTreatmentList = lodash.map(
      treatmentItem?.opTreatmentList || [],
      (item: any) => ({
        ...item,
        group: !!item.group || uuidv4(),
      })
    );
  });

  return { ...nextState };
};
