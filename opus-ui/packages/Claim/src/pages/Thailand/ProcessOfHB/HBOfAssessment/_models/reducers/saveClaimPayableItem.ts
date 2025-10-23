import { produce } from 'immer';
import lodash, { get } from 'lodash';
import { complementClaimPayableItem } from '../functions/complementClaimPayableItem';
import clearClaimPayableItem from '../functions/clearClaimPayableItem';
import { formUtils } from 'basic/components/Form';

const saveClaimPayableItem = (state: any, action: any) => {
  const { listPolicy } = state;
  const { changedFields, incidentPayableId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    let newClaimEntities = draftState.claimEntities;
    const incidentPayableItem = newClaimEntities.claimPayableListMap[incidentPayableId];
    let editPayableItem = { ...incidentPayableItem, ...changedFields };
    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      const [name] = fieldsArray[0];
      if (name === 'policyNo') {
        editPayableItem.productCode = '';
        editPayableItem.benefitTypeCode = '';
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;
        clearClaimPayableItem(editPayableItem, newClaimEntities);
      }
      // 修改产品
      if (name === 'benefitTypeCode') {
        editPayableItem.productCode = '';
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;
        clearClaimPayableItem(editPayableItem, newClaimEntities);
        // incidentDecisions唯一性校验
        const preClaimPayableList = formUtils.cleanValidateData(
          newClaimEntities.claimPayableListMap
        );
        const claimPayableListEntries = Object.entries(preClaimPayableList);
        const payable = lodash.filter(
          claimPayableListEntries,
          (payableItem) =>
            payableItem[1].incidentId === formUtils.queryValue(editPayableItem.incidentId) &&
            payableItem[1].policyNo === formUtils.queryValue(editPayableItem.policyNo) &&
            payableItem[1].benefitTypeCode === formUtils.queryValue(editPayableItem.benefitTypeCode)
        );
        const curPolicyNo = formUtils.queryValue(editPayableItem.policyNo);
        const curBenefitTypeCode = formUtils.queryValue(editPayableItem.benefitTypeCode);
        if (payable.length === 0 && curBenefitTypeCode && curPolicyNo) {
          // 过滤当前选中的保单
          const mappingPolicy = lodash.filter(
            listPolicy,
            (item) => item.policyNo === curPolicyNo && item.benefitTypeCode == curBenefitTypeCode
          );
          editPayableItem.benefitCategory = get(mappingPolicy[0], 'benefitCategory');
          editPayableItem.productCode = get(mappingPolicy[0], 'coreProductCode');
          editPayableItem.coverageKey = get(mappingPolicy[0], 'coverageKey');
          // 选择保单、产品、benefitTypeCode后补全当前claimPayableListItem
          const result = complementClaimPayableItem(editPayableItem, newClaimEntities);
          editPayableItem = result.editClaimPayableListItem;
          newClaimEntities = result.editClaimEntities;
        }
      }
      if (
        name === 'assessorOverrideAmount' &&
        lodash.isNumber(changedFields.assessorOverrideAmount.value)
      ) {
        const payableAmount = formUtils.queryValue(editPayableItem.assessorOverrideAmount);

        if (editPayableItem.benefitCategory === 'L' && editPayableItem.lifePayable) {
          if (payableAmount || lodash.isNumber(payableAmount)) {
            editPayableItem.payableAmount = payableAmount;
            editPayableItem.lifePayable.payableAmount = payableAmount;
            editPayableItem.lifePayable.assessorOverrideAmount = payableAmount;
          }
        }
      }
    }

    newClaimEntities.claimPayableListMap[incidentPayableId] = editPayableItem;

    draftState.claimEntities = newClaimEntities;
  });
  return { ...nextState };
};

export default saveClaimPayableItem;
