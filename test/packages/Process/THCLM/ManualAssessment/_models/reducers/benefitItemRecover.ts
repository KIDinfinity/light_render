import lodash from 'lodash';
import { produce }  from 'immer';
import { mapToPayableListMap } from 'process/Utils/benefitCategoryUtils';

const mapSearchName = {
  payableAmount: 'systemCalculationAmount',
  payableDays: 'systemPayableDays',
  deductibleNetExpense: 'systemDeductibleAmount',
  deductibleOtherInsurerDeduction: 'systemdeDuctibleOtherInsurerDeduction',
};

const benefitItemRecover = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState) => {
    const { groupBy, benefitCategory, fieldName, payableId } = payload;

    const handle = (id: string) => {
      const extra = {
        [fieldName]:
          draftState.claimEntities?.[mapToPayableListMap?.[benefitCategory]]?.[id]?.[
            mapSearchName?.[fieldName]
          ],
      };
      draftState.claimEntities[mapToPayableListMap[benefitCategory]][id] = {
        ...draftState.claimEntities?.[mapToPayableListMap?.[benefitCategory]]?.[id],
        ...extra,
      };
    };

    if (payableId) {
      handle(payableId);
    } else if (groupBy) {
      lodash.forEach(groupBy, (item) => handle(item?.id));
    }
  });
  return { ...nextState };
};

export default benefitItemRecover;
