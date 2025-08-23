import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'stepsChange.PlanInfo', true);
    lodash.set(
      draftState,
      `businessData.policyList[0].coverageList[0].coverageFundInfoList[0].portfolioId`,
      changedFields?.portfolioId
    );
  });
  return { ...nextState };
};
