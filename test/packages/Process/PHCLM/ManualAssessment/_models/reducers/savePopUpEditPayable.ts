/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { getPolicyItem } from 'basic/utils/PolicyUtils';

export default (state: any, action: any) => {
  const { item } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.isEmpty(item)) {
      draftState.PopUpEditPayable = {
        data: {
          incidentId: '',
          children: [],
        },
      };
      draftState.showPopUpEditPayable = false;
    } else if (!lodash.isEmpty(item?.children)) {
      const cleanItem = formUtils.cleanValidateData(item);
      // 这里产品已经确认了，所以只需要取children一条就可以
      const { benefitTypeCode, payableId, benefitItemCode, policyNo } = cleanItem?.children[0];
      const coverageKey = draftState.claimEntities.claimPayableListMap[payableId].coverageKey;
      const { isStandaloneBooster } = getPolicyItem({
        listPolicy: draftState.listPolicy,
        benefitTypeCode,
        coverageKey,
        benefitItemCode,
        policyNo,
      });

      draftState.PopUpEditPayable = {
        data: {
          ...cleanItem,
          children: cleanItem.children.map((el: any) => ({
            ...el,
            benefitCategory: cleanItem.benefitCategory,
            isStandaloneBooster,
          })),
        },
      };
      draftState.showPopUpEditPayable = true;
    }
  });
  return { ...nextState };
};
