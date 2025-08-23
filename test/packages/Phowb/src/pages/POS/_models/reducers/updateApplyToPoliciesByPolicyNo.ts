import { produce }  from 'immer';
import lodash from 'lodash';

const updateApplyToPoliciesByPolicyNo = (state: any, action: any) => {
  const { policyNo, applyTo } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const policies = lodash.map(
      draftState.claimProcessData.posDataDetail.applyToPolicies.policies,
      (item) => {
        if (item.policyNo === policyNo) {
          return { ...item, applyTo };
        }
        return item;
      }
    );
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.applyToPolicies.policies = policies;
  });

  return { ...nextState };
};

export default updateApplyToPoliciesByPolicyNo;
