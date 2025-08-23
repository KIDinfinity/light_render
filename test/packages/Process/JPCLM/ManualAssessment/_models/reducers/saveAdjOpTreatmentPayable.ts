import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';

import { OPTREATMENTPAYABLE } from '@/utils/claimConstant';

const addOptreatmentPayableItem = ({
  draftState,
  treatmentPayableId,
  incidentId,
  treatmentId,
  opTreatmentId,
  opTreatmentPayable,
  changedFields,
  hospitalizationSequentialNo,
}: any) => {
  const opTreatmentPayableItemId = uuidv4();

  if (
    !draftState.claimEntities.treatmentPayableListMap[treatmentPayableId]?.opTreatmentPayableList
  ) {
    draftState.claimEntities.treatmentPayableListMap[
      treatmentPayableId
    ].opTreatmentPayableList = [];
  }

  draftState.claimEntities.treatmentPayableListMap[treatmentPayableId].opTreatmentPayableList = [
    ...draftState.claimEntities.treatmentPayableListMap[treatmentPayableId].opTreatmentPayableList,
    opTreatmentPayableItemId,
  ];

  draftState.claimEntities.opTreatmentPayableListMap[opTreatmentPayableItemId] = {
    ...OPTREATMENTPAYABLE,
    id: opTreatmentPayableItemId,
    claimNo: draftState.claimProcessData.claimNo,
    treatmentPayableId,
    incidentId,
    treatmentId,
    opTreatmentId,
    isChangeNo: true,
    ...lodash.omit(opTreatmentPayable, ['id']),
    ...changedFields,
    hospitalizationSequentialNo,
  };
};

const saveAdjOpTreatmentPayable = (state: any, action: any) => {
  const { changedFields, treatmentPayableItem, opTreatmentPayableList } = action.payload;

  const { incidentId, treatmentId, opTreatmentId } = treatmentPayableItem || {};

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) !== 1) return;

    const hospitalizationSequentialNo = formUtils.queryValue(
      changedFields.changeHospitalizationSequentialNo
    );
    if (lodash.has(changedFields, 'changeHospitalizationSequentialNo')) {
      if (lodash.size(opTreatmentPayableList) === 2) {
        const changItem =
          lodash.find(opTreatmentPayableList, (el: any) => el.payableAmount > 0) || {};

        // 删除
        if (!hospitalizationSequentialNo) {
          draftState.claimEntities.treatmentPayableListMap[
            treatmentPayableItem.id
          ].opTreatmentPayableList = lodash.filter(
            draftState.claimEntities.treatmentPayableListMap[treatmentPayableItem.id]
              .opTreatmentPayableList,
            (el: any) => el !== changItem.id
          );

          delete draftState.claimEntities.opTreatmentPayableListMap[changItem.id];
        } else {
          // 修改
          draftState.claimEntities.opTreatmentPayableListMap[changItem.id] = {
            ...draftState.claimEntities.opTreatmentPayableListMap[changItem.id],
            ...changedFields,
          };
        }
      }

      if (lodash.size(opTreatmentPayableList) === 1) {
        // 新增
        addOptreatmentPayableItem({
          draftState,
          treatmentPayableId: treatmentPayableItem?.id,
          incidentId,
          treatmentId,
          opTreatmentId,
          opTreatmentPayable: opTreatmentPayableList[0],
          changedFields,
          hospitalizationSequentialNo: changedFields?.changeHospitalizationSequentialNo?.value,
        });
      }
    }
  });

  return { ...nextState };
};

export default saveAdjOpTreatmentPayable;
