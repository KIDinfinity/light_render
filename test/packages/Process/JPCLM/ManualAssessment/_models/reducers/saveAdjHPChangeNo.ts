import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';
import { TREATMENTPAYABLEITEM } from '@/utils/claimConstant';

const addTreatmentPayableItem = ({
  draftState,
  treatmentPayableItem,
  hospitalizationSequentialNo,
}: any) => {
  const treatmentPayableItemId = uuidv4();

  draftState.claimEntities.claimPayableListMap[
    treatmentPayableItem.payableId
  ].treatmentPayableList = [
    ...draftState.claimEntities.claimPayableListMap[treatmentPayableItem.payableId]
      .treatmentPayableList,
    treatmentPayableItemId,
  ];

  draftState.claimEntities.treatmentPayableListMap[treatmentPayableItemId] = {
    ...TREATMENTPAYABLEITEM,
    ...lodash.omit(treatmentPayableItem, [
      'assessorOverrideAmount',
      'assessorOverrideDays',
      'payableDays',
      'payableAmount',
      'systemCalculationAmount',
    ]),
    id: treatmentPayableItemId,
    isChangeNo: true,
    hospitalizationSequentialNo,
  };
};

const saveAdjHPChangeNo = (state: any, action: any) => {
  const { treatmentPayableList, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) !== 1) return;

    const hospitalizationSequentialNo = formUtils.queryValue(
      changedFields.changeHospitalizationSequentialNo
    );

    if (lodash.size(treatmentPayableList) === 2) {
      const changItem = lodash.find(treatmentPayableList, (el: any) => el.payableAmount > 0) || {};
      // 删除
      if (!hospitalizationSequentialNo) {
        const claimPayable = draftState.claimEntities.claimPayableListMap[changItem.payableId];
        draftState.claimEntities.claimPayableListMap[
          changItem.payableId
        ].treatmentPayableList = lodash.filter(
          claimPayable.treatmentPayableList,
          (el: any) => el !== changItem.id
        );

        delete draftState.claimEntities.treatmentPayableListMap?.[changItem.id];
      }
      // 修改
      draftState.claimEntities.treatmentPayableListMap[changItem.id] = {
        ...draftState.claimEntities.treatmentPayableListMap[changItem.id],
        hospitalizationSequentialNo,
      };
    }
    if (lodash.size(treatmentPayableList) === 1) {
      // 新增
      addTreatmentPayableItem({
        draftState,
        treatmentPayableItem: treatmentPayableList[0],
        hospitalizationSequentialNo,
      });
    }
  });

  return { ...nextState };
};

export default saveAdjHPChangeNo;
