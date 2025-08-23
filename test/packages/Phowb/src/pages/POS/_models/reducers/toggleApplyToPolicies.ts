import { produce }  from 'immer';
import lodash from 'lodash';

const updateApplyToPolicies = (state: any, action: any) => {
  const { selectAll } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const policies = lodash.map(
      draftState.claimProcessData.posDataDetail.applyToPolicies.policies,
      (item) => {
        return { ...item, applyTo: selectAll };
      }
    );
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.applyToPolicies.policies = policies;
  });

  return { ...nextState };
};

export default updateApplyToPolicies;
