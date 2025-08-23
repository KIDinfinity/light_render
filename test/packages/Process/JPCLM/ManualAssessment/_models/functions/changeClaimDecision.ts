import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';

export const changeClaimDecision = (claimEntities: any) => {
  const {
    claimPayableListMap,
    treatmentPayableListMap,
    procedurePayableListMap,
    otherProcedurePayableListMap,
    invoicePayableListMap,
    serviceItemPayableListMap,
  } = claimEntities;

  const ListMapString = {
    treatmentPayableListMap,
    procedurePayableListMap,
    otherProcedurePayableListMap,
    invoicePayableListMap,
    serviceItemPayableListMap,
  };

  const getClaimDecision = (ListMap: any) => {
    if (!lodash.isEmpty(ListMap)) {
      lodash.map(ListMap, (Item, Id) => {
        if (formUtils.queryValue(Item.payableAmount) > 0) {
          ListMap[Id].claimDecision = formUtils.queryValue(
            claimPayableListMap[Item.payableId].claimDecision
          );
        } else {
          ListMap[Id].claimDecision = ClaimDecision.deny;
        }
      });
    }
  };

  lodash.map(ListMapString, (ListMap) => {
    getClaimDecision(ListMap);
  });
};
