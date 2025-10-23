import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import clearClaimPayableItem from './clearClaimPayableItem';
import { complementClaimPayableItem } from '../functions/complementClaimPayableItem';

const findPolicy = (listPolicy: any, payable: any) =>
  lodash.find(
    listPolicy,
    (item: any) =>
      item.policyNo === formUtils.queryValue(payable.policyNo) &&
      item.coreProductCode === formUtils.queryValue(payable.productCode) &&
      item.benefitTypeCode === formUtils.queryValue(payable.benefitTypeCode)
  );

export default (claimPayable: any, entities: any, listPolicy: any[]) => {
  const editPayableItem = { ...claimPayable };
  editPayableItem.lifePayable = null;
  clearClaimPayableItem(editPayableItem, entities);
  // incidentDecisions唯一性校验
  const editPayable = formUtils.cleanValidateData(editPayableItem);
  const preClaimPayableList = formUtils.cleanValidateData(entities.claimPayableListMap);
  const claimPayableListEntries = Object.entries(preClaimPayableList);
  const payable = lodash.filter(
    claimPayableListEntries,
    (payableItem: any) =>
      payableItem[1].incidentId === editPayable.incidentId &&
      payableItem[1].policyNo === editPayable.policyNo &&
      payableItem[1].productCode === editPayable.productCode &&
      payableItem[1].benefitTypeCode === editPayable.benefitTypeCode
  );

  if (payable.length === 0) {
    // 过滤当前选中的保单
    const mappingPolicy = findPolicy(listPolicy, editPayable);

    if (!lodash.isEmpty(mappingPolicy)) {
      editPayableItem.benefitCategory = lodash.get(mappingPolicy, 'benefitCategory');
      editPayableItem.coverageKey = lodash.get(mappingPolicy, 'coverageKey');

      // 选择保单、产品、benefitTypeCode后补全当前claimPayableListItem
      return complementClaimPayableItem(
        editPayableItem,
        entities,
        lodash.get(mappingPolicy, 'sumAssured')
      );
    }
  }

  return {
    editClaimPayableListItem: claimPayable,
    editClaimEntities: entities,
  };
};
