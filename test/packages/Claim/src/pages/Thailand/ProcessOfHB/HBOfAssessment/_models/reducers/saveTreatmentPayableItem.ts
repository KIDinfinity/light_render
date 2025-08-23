import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { valueIsEmpty } from '@/utils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const saveTreatmentPayableItem = (state: any, action: any) => {
  const { changedFields, treatmentPayableItemId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const newClaimEntities = draftState.claimEntities;
    const editPayableItem = {
      ...newClaimEntities.treatmentPayableListMap[treatmentPayableItemId],
      ...changedFields,
    };

    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];

      // 修改给付责任
      if (name === 'benefitItemCode') {
        // incidentDecisions唯一性校验
        const editPayable = formUtils.cleanValidateData(editPayableItem);
        const preTreatmentPayableList = formUtils.cleanValidateData(
          newClaimEntities.treatmentPayableListMap
        );
        const treatmentPayableListEntries = Object.entries(preTreatmentPayableList) || [];

        const payable = treatmentPayableListEntries.filter(
          (payableItem) =>
            payableItem[1].incidentId === editPayable.incidentId &&
            payableItem[1].treatmentId === editPayable.treatmentId &&
            payableItem[1].policyNo === editPayable.policyNo &&
            payableItem[1].productCode === editPayable.productCode &&
            //   payableItem[1].benefitTypeCode === editPayable.benefitTypeCode &&
            payableItem[1].benefitItemCode === editPayable.benefitItemCode
        );

        if (
          (changedFields.benefitItemCode.dirty === true && payable.length > 0) ||
          (changedFields.benefitItemCode.dirty === false && payable.length > 1)
        ) {
          editPayableItem.benefitItemCode.errors = [
            {
              message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }),
              field: 'benefitItemCode',
            },
          ];
        }
      }
      // 修改调整支付金额

      // 修改调整支付金额
      if (name === 'assessorOverrideAmount') {
        editPayableItem.payableAmount = null;
        if (lodash.isNumber(value)) {
          editPayableItem.payableAmount = value;
        } else if (
          valueIsEmpty(value) &&
          lodash.isNumber(editPayableItem.systemCalculationAmount)
        ) {
          editPayableItem.payableAmount = editPayableItem.systemCalculationAmount;
        }
      }
    }
    newClaimEntities.treatmentPayableListMap[treatmentPayableItemId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });

  return { ...nextState };
};

export default saveTreatmentPayableItem;
