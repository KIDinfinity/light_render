/* eslint-disable import/no-unresolved */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { cloneDeep, isNumber } from 'lodash';
import { multiply } from '@/utils/precisionUtils';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { checkLifePayableDuplicate } from '../functions/claimPayableFunc';
import {
  deleteDecisionForLifePayable,
  updateDecisionForLifePayable,
} from '../functions/expectDecisionFunc';
import { deleteErrorMessages } from '../functions';

const saveLifePayable = (state, action) => {
  const { changedFields, incidentPayableId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const { claimProcessData, claimEntities } = draftState;
    const { claimPayableListMap } = claimEntities;
    const claimPayableTemp = cloneDeep(claimPayableListMap);
    const claimPayableItem = claimPayableListMap[incidentPayableId];
    const preClaimPayableItem = cloneDeep(claimPayableItem);
    const newClaimPayableItem = {
      ...claimPayableItem,
      lifePayable: {
        ...claimPayableItem.lifePayable,
        ...changedFields,
      },
    };
    const editPayableItemValue = formUtils.cleanValidateData(newClaimPayableItem);
    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      const [name] = fieldsArray[0];
      const {
        calculationAmount,
        assessorOverrideMultiple,
        reimbursementMultiple,
        systemCalculationAmount,
        payableAmount,
      } = editPayableItemValue.lifePayable;

      if (name === 'benefitItemCode') {
        const isDuplicate = checkLifePayableDuplicate(claimPayableListMap, newClaimPayableItem);
        // 唯一性校验
        if (!isDuplicate) {
          deleteDecisionForLifePayable(claimProcessData, preClaimPayableItem);
          updateDecisionForLifePayable(claimProcessData, newClaimPayableItem);
          newClaimPayableItem.lifePayable.manualAdd = SwitchEnum.YES;
          newClaimPayableItem.lifePayable.amountType = '';
          newClaimPayableItem.lifePayable.calculationAmount = null;
          newClaimPayableItem.lifePayable.reimbursementMultiple = null;
          newClaimPayableItem.lifePayable.assessorOverrideMultiple = null;
          newClaimPayableItem.lifePayable.payableAmount = 0;
          newClaimPayableItem.systemCalculationAmount = 0;
          newClaimPayableItem.assessorOverrideAmount = null;
          newClaimPayableItem.payableAmount = 0;
          newClaimPayableItem.remark = '';
        }

        claimPayableTemp[incidentPayableId] = newClaimPayableItem;
        claimEntities.claimPayableListMap = deleteErrorMessages.delLifePayableBenefitItem(
          claimPayableTemp,
          incidentPayableId
        );
      }
      if (name === 'calculationAmount') {
        let newPayableAmount = payableAmount;
        // 调整倍率为空&&倍率不为空，用倍率计算
        if (
          isNumber(calculationAmount) &&
          isNumber(reimbursementMultiple) &&
          !isNumber(assessorOverrideMultiple)
        ) {
          newPayableAmount = multiply(calculationAmount, reimbursementMultiple);
        } else if (isNumber(calculationAmount) && isNumber(assessorOverrideMultiple)) {
          // 调整倍率不为空，用调整倍率计算
          newPayableAmount = multiply(calculationAmount, assessorOverrideMultiple);
        }
        newClaimPayableItem.lifePayable.assessorOverrideAmount = newPayableAmount;
        newClaimPayableItem.lifePayable.payableAmount = newPayableAmount;
        newClaimPayableItem.assessorOverrideAmount = newPayableAmount;
        newClaimPayableItem.payableAmount = newPayableAmount;
      }
      if (name === 'assessorOverrideMultiple') {
        if (isNumber(assessorOverrideMultiple)) {
          // 计算金额不为空
          if (isNumber(calculationAmount)) {
            const newPayableAmount = multiply(calculationAmount, assessorOverrideMultiple);
            newClaimPayableItem.lifePayable.assessorOverrideAmount = newPayableAmount;
            newClaimPayableItem.lifePayable.payableAmount = newPayableAmount;
            newClaimPayableItem.assessorOverrideAmount = newPayableAmount;
            newClaimPayableItem.payableAmount = newPayableAmount;
          }
        } else {
          newClaimPayableItem.lifePayable.assessorOverrideAmount = null;
          newClaimPayableItem.lifePayable.payableAmount = systemCalculationAmount;
          newClaimPayableItem.payableAmount = systemCalculationAmount;
        }
        updateDecisionForLifePayable(claimProcessData, newClaimPayableItem);
      }
    }

    claimEntities.claimPayableListMap[incidentPayableId] = newClaimPayableItem;
  });
  return { ...nextState };
};

export default saveLifePayable;
