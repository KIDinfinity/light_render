import { produce }  from 'immer';
import lodash from 'lodash';
import { add, multiply } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';

const sumData = ({ draftState, treatmentPayableId, changedFields }: any) => {
  const opTreatmentPayableList = lodash.filter(
    draftState.claimEntities.opTreatmentPayableListMap,
    (item: any) => item.treatmentPayableId === treatmentPayableId
  );

  let payableAmount: any = null;
  let payableDays: any = null;
  let changeObjectAmount: any = null;

  lodash.forEach(opTreatmentPayableList, (item: any) => {
    // if (lodash.has(changedFields, 'assessorOverrideAmount')) {
    payableAmount = lodash.isNumber(item.assessorOverrideAmount)
      ? add(payableAmount || 0, item.assessorOverrideAmount)
      : item.payableAmount;
    // }
    // if (lodash.has(changedFields, 'assessorOverrideDays')) {
    payableDays = lodash.isNumber(item.assessorOverrideDays)
      ? add(payableDays || 0, item.assessorOverrideDays)
      : item.payableDays;
    // }
    changeObjectAmount = lodash.isNumber(item.changeObjectAmount)
      ? add(changeObjectAmount || 0, item.changeObjectAmount)
      : changeObjectAmount;

    // ne
  });
  draftState.claimEntities.treatmentPayableListMap[treatmentPayableId] = {
    ...draftState.claimEntities.treatmentPayableListMap[treatmentPayableId],
    payableAmount,
    payableDays,
    changeObjectAmount,
  };
};

const saveAdjOpTreatmentPayableItem = (state: any, action: any) => {
  const { treatmentPayableItem, id, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) !== 1) return;
    let extra = {};

    const item = draftState.claimEntities.opTreatmentPayableListMap[id];

    if (lodash.has(changedFields, 'reversalFlag')) {
      const value = formUtils.queryValue(changedFields.reversalFlag);
      extra = {
        changeObjectAmount: value === 'N' ? null : Math.abs(item.payableAmount),
      };
    }

    if (lodash.has(changedFields, 'assessorOverrideDays')) {
      const listPolicy = draftState.listPolicy;
      changedFields.payableDays = formUtils.queryValue(changedFields?.assessorOverrideDays);

      const { policyNo, productCode } = lodash.pick(
        draftState.claimEntities.treatmentPayableListMap[treatmentPayableItem.id],
        ['policyNo', 'productCode']
      );
      const sumAssured = lodash.find(listPolicy, {
        coreProductCode: formUtils.queryValue(productCode),
        policyNo: formUtils.queryValue(policyNo),
      })?.sumAssured;
      changedFields.payableAmount = multiply(
        formUtils.queryValue(changedFields.payableDays),
        sumAssured
      );
      changedFields.assessorOverrideAmount = multiply(
        formUtils.queryValue(changedFields.payableDays),
        sumAssured
      );
    }

    draftState.claimEntities.opTreatmentPayableListMap[id] = {
      ...item,
      ...changedFields,
      ...extra,
    };
    draftState.claimEntities.treatmentPayableListMap[treatmentPayableItem?.id] = {
      ...draftState.claimEntities.treatmentPayableListMap[treatmentPayableItem?.id],
      ...extra,
    };
    sumData({
      draftState,
      treatmentPayableId: treatmentPayableItem.id,
      changedFields,
      opTreatmentPayableId: id,
    });
  });

  return { ...nextState };
};

export default saveAdjOpTreatmentPayableItem;
