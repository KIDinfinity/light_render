import { produce } from 'immer';
import lodash, { cloneDeep } from 'lodash';
import { formUtils } from 'basic/components/Form';
import {
  findClaimPayableByPolicyNo,
  findClaimPayableByProduct,
} from '../functions/findCurIncidentPayable';
import { deleteErrorMessages } from '../functions';

const saveTreatmentPayableAddItem = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { claimEntities, treatmentPayableAddItem } = draftState;
    const { changedFields } = payload;
    const treatmentPayableAdd = { ...treatmentPayableAddItem, ...changedFields };
    const treatmentPayableCur = formUtils.cleanValidateData(treatmentPayableAdd);
    const { claimPayableListMap } = claimEntities;
    const treatmentPayableTemp = cloneDeep(claimEntities.treatmentPayableListMap);
    const fieldsArray = Object.keys(changedFields);
    if (fieldsArray.length === 1) {
      if (lodash.has(changedFields, 'policyNo')) {
        treatmentPayableAdd.productCode = null;
        treatmentPayableAdd.benefitTypeCode = null;
        treatmentPayableAdd.benefitItemCode = null;
        // 如果当前的保单过滤后只有一条incidentPayable数据
        const incidentPayableItem = findClaimPayableByPolicyNo(
          claimPayableListMap,
          treatmentPayableCur
        );

        if (incidentPayableItem) {
          treatmentPayableAdd.productCode = {
            ...treatmentPayableAdd.productCode,
            touched: true,
            name: 'productCode',
            value: formUtils.queryValue(incidentPayableItem.productCode),
            errors: undefined,
          };
          treatmentPayableAdd.benefitTypeCode = {
            ...treatmentPayableAdd.benefitTypeCode,
            touched: true,
            name: 'benefitTypeCode',
            value: formUtils.queryValue(incidentPayableItem.benefitTypeCode),
            errors: undefined,
          };
        }
      }
      // 修改产品
      if (lodash.has(changedFields, 'productCode')) {
        treatmentPayableAdd.benefitTypeCode = null;
        treatmentPayableAdd.benefitItemCode = null;
        const incidentPayableItem = findClaimPayableByProduct(
          claimPayableListMap,
          treatmentPayableCur
        );

        // 如果当前的保单+产品过滤后只有一条incidentPayable数据
        if (incidentPayableItem) {
          treatmentPayableAdd.benefitTypeCode = {
            ...treatmentPayableAdd.benefitTypeCode,
            touched: true,
            name: 'productCode',
            value: formUtils.queryValue(incidentPayableItem.benefitTypeCode),
            errors: undefined,
          };
        }
      }
      // 修改benefitTypeCode
      if (lodash.has(changedFields, 'benefitTypeCode')) {
        treatmentPayableAdd.benefitItemCode = null;
      }

      if (lodash.has(changedFields, 'benefitItemCode')) {
        draftState.claimEntities.treatmentPayableListMap = deleteErrorMessages.delTreatmentPayableBenefitItem(
          treatmentPayableTemp,
          treatmentPayableAdd.id
        );
      }
    }

    draftState.treatmentPayableAddItem = treatmentPayableAdd;
  });

  return { ...nextState };
};

export default saveTreatmentPayableAddItem;
