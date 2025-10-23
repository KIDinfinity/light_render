import { produce } from 'immer';
import lodash, { get } from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import { formUtils } from 'basic/components/Form';
import { EPolicySource } from 'claim/enum/EPolicySource';
import { BeyondNEL } from 'claim/enum/BeyondNEL';
import clearClaimPayableItem from '../functions/clearClaimPayableItem';
import { complementClaimPayableItem } from '../functions/complementClaimPayableItem';
import { countPolicyDuration, countContestableClaim } from '../functions/fnObject';

const saveClaimPayableItem = (state: any, action: any) => {
  const { listPolicy } = state;
  const { changedFields, incidentPayableId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const { claimProcessData } = draftState;
    let newClaimEntities = draftState.claimEntities;
    const incidentPayableItem = newClaimEntities.claimPayableListMap[incidentPayableId];
    const incidentId = lodash.get(incidentPayableItem, 'incidentId');
    const incidentDate = lodash.get(newClaimEntities, `incidentListMap.${incidentId}.incidentDate`);
    let editPayableItem = { ...incidentPayableItem, ...changedFields };
    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      const [name, { dirty, value }] = fieldsArray[0];
      if (name === 'policyNo' && !dirty) {
        editPayableItem.productCode = '';
        editPayableItem.benefitTypeCode = '';
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;

        clearClaimPayableItem(editPayableItem, newClaimEntities);
        const policyItem = lodash.find(listPolicy, { policyNo: value });
        editPayableItem.policySource = policyItem?.policySource;
        const { issueEffectiveDate, policySource, beyondNel } = lodash.pick(policyItem, [
          'issueEffectiveDate',
          'policySource',
          'beyondNel',
        ]);
        editPayableItem.beyondNel =
          EPolicySource.Group === policySource && beyondNel === BeyondNEL.YES ? 1 : 0;
        const { year, month } = countPolicyDuration(incidentDate, issueEffectiveDate);
        editPayableItem.policyDurationYears = year;
        editPayableItem.policyDurationMonths = month;
        editPayableItem.contestableClaim = countContestableClaim(incidentDate, issueEffectiveDate);
      }
      // 修改产品
      if (name === 'productCode' && !dirty) {
        editPayableItem.benefitTypeCode = '';
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;
        clearClaimPayableItem(editPayableItem, newClaimEntities);
      }
      // 修改给付责任
      if (name === 'benefitTypeCode' && !dirty) {
        editPayableItem.lifePayable = null;
        clearClaimPayableItem(editPayableItem, newClaimEntities);
        // incidentDecisions唯一性校验
        const editPayable = formUtils.cleanValidateData(editPayableItem);
        const preClaimPayableList = formUtils.cleanValidateData(
          newClaimEntities.claimPayableListMap
        );
        const claimPayableListEntries = Object.entries(preClaimPayableList);
        const payable = lodash.filter(
          claimPayableListEntries,
          (payableItem) =>
            payableItem[1].incidentId === editPayable.incidentId &&
            payableItem[1].policyNo === editPayable.policyNo &&
            payableItem[1].productCode === editPayable.productCode &&
            payableItem[1].benefitTypeCode === editPayable.benefitTypeCode
        );

        if (payable.length === 0) {
          // 过滤当前选中的保单
          const mappingPolicy = lodash.find(
            listPolicy,
            (item) =>
              item.policyNo === editPayable.policyNo &&
              item.coreProductCode === editPayable.productCode &&
              item.benefitTypeCode === editPayable.benefitTypeCode
          );
          editPayableItem.benefitCategory = get(mappingPolicy, 'benefitCategory');
          editPayableItem.coverageKey = get(mappingPolicy, 'coverageKey');
          // 选择保单、产品、benefitTypeCode后补全当前claimPayableListItem
          const result = complementClaimPayableItem(
            editPayableItem,
            newClaimEntities,
            lodash.get(mappingPolicy, 'sumAssured')
          );
          editPayableItem = result?.editClaimPayableListItem;
          newClaimEntities = result?.editClaimEntities;
        }
      }
      if (
        name === 'assessorOverrideAmount' &&
        lodash.isNumber(changedFields.assessorOverrideAmount.value)
      ) {
        const payableAmount = formUtils.queryValue(editPayableItem.assessorOverrideAmount);

        if (editPayableItem.benefitCategory === 'L') {
          if (payableAmount || lodash.isNumber(payableAmount)) {
            editPayableItem.payableAmount = payableAmount;
            lodash.set(editPayableItem, 'lifePayable.payableAmount', payableAmount);
            lodash.set(editPayableItem, 'lifePayable.assessorOverrideAmount', payableAmount);
          }
        }
      }

      if (name === 'claimDecision') {
        const claimPayableListMapValue = cleanFieldsMeta(newClaimEntities.claimPayableListMap);
        claimPayableListMapValue[incidentPayableId].claimDecision = value;
        const existApprove = lodash.some(
          claimPayableListMapValue,
          (payableItem) => payableItem.claimDecision === ClaimDecision.approve
        );
        const claimDecision = existApprove ? ClaimDecision.approve : ClaimDecision.deny;
        draftState.claimProcessData.claimDecision = {
          ...claimProcessData.claimDecision,
          assessmentDecision: claimDecision,
        };
      }
    }
    if (editPayableItem.benefitCategory === 'L') {
      const target = lodash.cloneDeep(formUtils.cleanValidateData(editPayableItem));
      editPayableItem.lifePayable = {
        ...editPayableItem.lifePayable,
        ...target,
        payableId: target.id,
      };
    } else {
      delete editPayableItem.lifePayable;
    }

    newClaimEntities.claimPayableListMap[incidentPayableId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });

  return { ...nextState };
};

export default saveClaimPayableItem;
