import lodash from 'lodash';
import { produce }  from 'immer';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const mapSearchName = {
  payableAmount: 'systemCalculationAmount',
  payableDays: 'systemPayableDays',
};

const map = {
  [eBenefitCategory.Cashless]: 'treatmentPayableListMap',
  [eBenefitCategory.Aipa]: 'accidentBenefitPayableListMap',
  [eBenefitCategory.Reimbursement]: 'serviceItemPayableListMap',
};

const benefitItemRecover = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState) => {
    const { groupBy, benefitCategory, fieldName, payableId } = payload;

    const handle = (id: string) => {
      const extra = {
        [fieldName]:
          draftState.claimEntities?.[map?.[benefitCategory]]?.[id]?.[mapSearchName?.[fieldName]],
      };
      draftState.claimEntities[map[benefitCategory]][id] = {
        ...draftState.claimEntities?.[map?.[benefitCategory]]?.[id],
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
