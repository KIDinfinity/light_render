/* eslint-disable import/no-unresolved */
import { cloneDeep, isNumber, isArray, forEach, isEmpty, get, some } from 'lodash';
import { produce } from 'immer';
import { getFieldValue, cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import { SwitchEnum, ClaimDecision } from 'claim/pages/utils/claim';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';

import {
  clearDataForPolicyNo,
  clearDataForProduct,
  clearDataForBenefitType,
  checkClaimPayableDuplicate,
  getMappingPolicyByBenefit,
  getPolicyCategoryByPolicyNo,
  getMappingPolicyByProduct,
  supplementClaimPayableItem,
  checkClaimPayableIsLife,
  getPolicySetupStatusByPolicyNo,
} from '../functions/claimPayableFunc';

import {
  updateExpectDecisionForDeleteClaimPayable,
  updateExpectDecisionForUpdateClaimPayable,
} from '../functions/expectDecisionFunc';

import { deleteErrorMessages } from '../functions';

const NONE = 'none';
const shouldUpdateExpectDecision = ['assessorOverrideAmount', 'claimDecision'];

const saveIncidentPayableItem = (state, action) => {
  const { listPolicy } = state;
  const { changedFields, incidentPayableId } = action.payload;
  const nextState = produce(state, (draftState) => {
    const { claimProcessData, claimEntities } = draftState;
    const { claimPayableListMap } = claimEntities;
    const claimPayableTemp = cloneDeep(claimPayableListMap);
    const claimPayableItem = claimPayableListMap[incidentPayableId];
    const { treatmentPayableList } = claimPayableListMap[incidentPayableId];
    const preClaimPayableItem = cloneDeep(claimPayableItem);
    const newClaimPayableItem = { ...claimPayableItem, ...changedFields };
    const fieldsArray = Object.entries(changedFields);
    const claimPayableListMapValue = cleanFieldsMeta(claimPayableListMap);

    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];
      if (name === 'policyNo') {
        updateExpectDecisionForDeleteClaimPayable(
          claimProcessData,
          claimEntities,
          preClaimPayableItem
        );
        clearDataForPolicyNo(claimEntities, newClaimPayableItem);
        newClaimPayableItem.manualAdd = SwitchEnum.YES;
        // 匹配当前选中的保单，判断是他契约/请求书契约
        const policyCategory = getPolicyCategoryByPolicyNo(listPolicy, newClaimPayableItem);
        newClaimPayableItem.policyCategory = policyCategory;
        const policySetupStatus = getPolicySetupStatusByPolicyNo(listPolicy, newClaimPayableItem);
        if (policySetupStatus) {
          newClaimPayableItem.policySetupStatus = policySetupStatus;
        }
        // claimPayableTemp[incidentPayableId] = newClaimPayableItem;
        // draftState.claimEntities.claimPayableListMap = deleteErrorMessages.delClaimPayablePolicy(
        //   claimPayableTemp,
        //   incidentPayableId
        // );
      }

      // 修改产品
      if (name === 'productCode') {
        if (isArray(get(newClaimPayableItem, 'policyNo.errors'))) {
          newClaimPayableItem.policyNo.errors = null;
        }
        updateExpectDecisionForDeleteClaimPayable(
          claimProcessData,
          claimEntities,
          preClaimPayableItem
        );
        clearDataForProduct(claimEntities, newClaimPayableItem);
        newClaimPayableItem.manualAdd = SwitchEnum.YES;
        // 匹配当前选中的保单，判断是RCS配置/RCS未配置
        const mappingPolicy = getMappingPolicyByProduct(listPolicy, newClaimPayableItem);
        const { coverageKey, policySetupStatus } = mappingPolicy;
        newClaimPayableItem.policySetupStatus = policySetupStatus;
        const isDuplicate = checkClaimPayableDuplicate(claimPayableListMap, newClaimPayableItem);
        if (policySetupStatus === PolicySetupStatus.NoImplement && !isDuplicate) {
          newClaimPayableItem.coverageKey = coverageKey;
          newClaimPayableItem.benefitTypeCode = NONE;
          // 把RCS未配置的payable同步到expectDecisionList
          updateExpectDecisionForUpdateClaimPayable(
            claimProcessData,
            claimEntities,
            newClaimPayableItem
          );
        }

        claimPayableTemp[incidentPayableId] = newClaimPayableItem;
        // eslint-disable-next-line no-param-reassign
        draftState.claimEntities.claimPayableListMap = deleteErrorMessages.delClaimPayableProduct(
          claimPayableTemp,
          incidentPayableId
        );
      }
      // 修改给付责任
      if (name === 'benefitTypeCode') {
        updateExpectDecisionForDeleteClaimPayable(
          claimProcessData,
          claimEntities,
          preClaimPayableItem
        );
        clearDataForBenefitType(claimEntities, newClaimPayableItem);
        newClaimPayableItem.manualAdd = SwitchEnum.YES;
        // 匹配当前选中的保单
        const mappingPolicy = getMappingPolicyByBenefit(listPolicy, newClaimPayableItem);
        newClaimPayableItem.benefitCategory = mappingPolicy.benefitCategory;
        newClaimPayableItem.coverageKey = mappingPolicy.coverageKey;

        // claimPayableItem重复性校验
        const claimPayableExist = checkClaimPayableDuplicate(claimEntities, newClaimPayableItem);
        if (!claimPayableExist) {
          // 选择保单、产品、benefitTypeCode后补全当前claimPayableListItem
          supplementClaimPayableItem(claimEntities, newClaimPayableItem);
        }

        claimPayableTemp[incidentPayableId] = newClaimPayableItem;
        // eslint-disable-next-line no-param-reassign
        draftState.claimEntities.claimPayableListMap = deleteErrorMessages.delClaimPayableBenefitType(
          claimPayableTemp,
          incidentPayableId
        );
      }
      if (name === 'assessorOverrideAmount') {
        const assessorOverrideAmount = changedFields.assessorOverrideAmount.value;
        const systemCalculationAmount = getFieldValue(newClaimPayableItem.systemCalculationAmount);
        if (isNumber(assessorOverrideAmount)) {
          newClaimPayableItem.payableAmount = assessorOverrideAmount;
          if (checkClaimPayableIsLife(newClaimPayableItem)) {
            newClaimPayableItem.lifePayable.payableAmount = assessorOverrideAmount;
            newClaimPayableItem.lifePayable.assessorOverrideAmount = assessorOverrideAmount;
          }
        } else {
          newClaimPayableItem.payableAmount = systemCalculationAmount;
          if (checkClaimPayableIsLife(newClaimPayableItem)) {
            newClaimPayableItem.lifePayable.payableAmount = systemCalculationAmount;
            newClaimPayableItem.lifePayable.assessorOverrideAmount = null;
          }
        }
      }

      if (name === 'claimDecision') {
        if (value === ClaimDecision.deny) {
          newClaimPayableItem.systemCalculationAmount = 0;
          newClaimPayableItem.assessorOverrideAmount = null;
          newClaimPayableItem.payableAmount = 0;
          if (!isEmpty(newClaimPayableItem.lifePayable)) {
            newClaimPayableItem.lifePayable.amountType = '';
            newClaimPayableItem.lifePayable.calculationAmount = null;
            newClaimPayableItem.lifePayable.reimbursementMultiple = null;
            newClaimPayableItem.lifePayable.assessorOverrideMultiple = null;
            newClaimPayableItem.lifePayable.payableAmount = 0;
          }
          forEach(treatmentPayableList, (treatmentPayableId) => {
            const treatmentPayable = claimEntities.treatmentPayableListMap[treatmentPayableId];
            treatmentPayable.systemCalculationAmount = 0;
            treatmentPayable.assessorOverrideAmount = null;
            treatmentPayable.systemPayableDays = null;
            treatmentPayable.assessorOverrideDays = null;
            treatmentPayable.reimbursementMultiple = null;
            treatmentPayable.assessorOverrideMultiple = null;
            treatmentPayable.systemDeductibleAmount = null;
            treatmentPayable.assessorOverrideDeductible = null;
            treatmentPayable.assessorOverridePercentage = null;
            treatmentPayable.deductibleAmount = null;
            treatmentPayable.payableAmount = 0;
            claimEntities.treatmentPayableListMap[treatmentPayableId] = treatmentPayable;
          });
        }
        claimPayableListMapValue[incidentPayableId].claimDecision = value;
        const existApprove = some(
          claimPayableListMapValue,
          (payableItem) => payableItem.claimDecision === ClaimDecision.approve
        );
        const claimDecision = existApprove ? ClaimDecision.approve : ClaimDecision.deny;
        draftState.claimProcessData.claimDecision = {
          ...claimProcessData.claimDecision,
          assessmentDecision: claimDecision,
        };
      }

      if (shouldUpdateExpectDecision.includes(name)) {
        updateExpectDecisionForUpdateClaimPayable(
          claimProcessData,
          claimEntities,
          newClaimPayableItem
        );
      }
    }

    claimEntities.claimPayableListMap[incidentPayableId] = newClaimPayableItem;
  });
  return { ...nextState };
};

export default saveIncidentPayableItem;
