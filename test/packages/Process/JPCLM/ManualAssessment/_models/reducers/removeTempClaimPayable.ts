import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import {  BenefitCategory } from 'claim/pages/utils/claim';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';


const removeTempClaimPayable = (state: any, action: any) => {
  const { listPolicy } = state;
  const { changedFields, incidentPayableId } = action.payload;


  const nextState = produce(state, (draftState: any) => {

    if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'benefitTypeCode')) {
        const editPayable = formUtils.cleanValidateData(lodash.get(draftState, `claimEntities.claimPayableListMap.${incidentPayableId}`));
        const mappingPolicy = lodash.find(
          listPolicy,
          (item) =>
            item.policyNo === formUtils.queryValue(editPayable.policyNo) &&
            item.coreProductCode === formUtils.queryValue(editPayable.productCode) &&
            item.benefitTypeCode === formUtils.queryValue(changedFields.benefitTypeCode)
        );

        if (mappingPolicy?.benefitCategory !== BenefitCategory.MajorIllnessCashBenefit) {
          return ;
        }
        const preClaimPayableList = lodash.filter(formUtils.cleanValidateData(
          draftState.claimEntities.claimPayableListMap
        ), item => item.id !== incidentPayableId);
        const claimPayableListEntries = Object.entries(preClaimPayableList);
        const payable = lodash.filter(
          claimPayableListEntries,
          (payableItem: any) =>
            payableItem[1].incidentId === editPayable.incidentId &&
            filterDuplicatePayable(payableItem[1], editPayable)
        );

        const target = lodash.filter(draftState.claimEntities.claimPayableListMap, item => item.id !== incidentPayableId);

        if (lodash.find(target, {benefitCategory:  BenefitCategory.MajorIllnessCashBenefit}) && (lodash.size(payable) > 0)) {
          draftState.claimProcessData.claimPayableList = lodash.filter(draftState.claimProcessData.claimPayableList, id => id !== incidentPayableId);
          delete draftState.claimEntities.claimPayableListMap[incidentPayableId];
        }
    }



  });
  return { ...nextState };
};

export default removeTempClaimPayable;
