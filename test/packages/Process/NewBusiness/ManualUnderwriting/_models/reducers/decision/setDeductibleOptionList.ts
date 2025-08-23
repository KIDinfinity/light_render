import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { deductibleOptionList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.deductibleOptionList = lodash.unionWith(
      draftState.deductibleOptionList,
      deductibleOptionList,
      (a, b) => a.productCode === b.productCode && a.benefitPlan === b.benefitPlan
    );
  });
  return { ...nextState };
};
