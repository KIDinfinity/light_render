import { produce } from 'immer';
import type { State } from '../state';

export default (state: State, action) => {
  const planList = action?.payload?.riderPlans || [];
  return produce(state, draftState => {
    planList.map(plan => {
      const matchedRider = draftState.processData.productInfoRiders.find(rider => rider.riderProductCode === plan.planCode);
      if(!matchedRider)
        return;
      matchedRider.pid = plan.pid;
      matchedRider.sumAssuredRider = plan.sumAssured;
      matchedRider.premiumRider = plan.basePrem;
      matchedRider.totalPremium = plan.totalPremium;
      matchedRider.coverageDuration = plan.policyTerm;
      matchedRider.paymentDuration = plan.premiumTerm;
    })
  })
}