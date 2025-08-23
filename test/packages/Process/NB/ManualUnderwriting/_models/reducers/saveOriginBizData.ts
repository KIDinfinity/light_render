import lodash from 'lodash';
import { produce }  from 'immer';

export default (state: any, action: any) => {
  const originBizData = lodash.get(action, 'payload.originBizData', {});
  const nextState = produce(state, (draftState: any) => {
    const { businessData } = draftState;
    if (lodash.isEmpty(businessData?.policyList?.[0]?.fundInfo)) {
      lodash.set(draftState, `businessData.policyList[0].fundInfo`, originBizData?.policyList?.[0]?.fundInfo);
    }
    lodash.set(draftState, 'originBizData', originBizData);
  });
  return {
    ...nextState,
  };
};
