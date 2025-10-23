import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import { find, isEmpty } from 'lodash';

/**
 *
 * @param listPolicy
 * @param claimPayableItem
 */
export const getMainProductCodeByPolicyNo = (listPolicy: any, claimPayableItem: any) => {
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const { policyNo } = claimPayableItemValue;
  if (isEmpty(policyNo)) {
    return '';
  }
  const policyById =
    find(
      listPolicy,
      (item) => item.policyNo === policyNo && item.mainProductCode
    ) || {};
  return policyById ? policyById.mainProductCode : '';
};
