import { formUtils } from 'basic/components/Form';
import { deleteOpTreatmentPayable } from '../functions';
import { produce } from 'immer';
import lodash from 'lodash';

const opTreatmentListDelete = (state: any, action: any) => {
  const { treatmentId, deleteDate, deleteGroupId } = action.payload;
  /**
   * 传参说明(deleteDate/deleteGroupId只能传一个，不能同时传)
   * deleteDate:删除某个具体的日期
   * deleteGroupId:删除某个组的所有日期
   */

  const nextState = produce(state, (draftState: any) => {
    const { opTreatmentList } = formUtils.cleanValidateData(
      draftState.claimEntities?.treatmentListMap?.[treatmentId] || {}
    );

    if (deleteGroupId) {
      lodash.forEach(opTreatmentList, ({ group, outpatientTreatmentDate }: any) => {
        if (group === deleteGroupId) {
          deleteOpTreatmentPayable({ draftState, treatmentId, outpatientTreatmentDate });
        }
      });
    }
    if (deleteDate) {
      deleteOpTreatmentPayable({ draftState, treatmentId, outpatientTreatmentDate: deleteDate });
    }

    const filterCondition = !!deleteGroupId
      ? ({ group }: any) => group !== deleteGroupId
      : !!deleteDate
        ? ({ outpatientTreatmentDate }: any) => outpatientTreatmentDate !== deleteDate
        : () => true;

    draftState.claimEntities.treatmentListMap[treatmentId].opTreatmentList =
      opTreatmentList?.filter(filterCondition);

    return draftState;
  });

  return { ...nextState };
};

export default opTreatmentListDelete;
