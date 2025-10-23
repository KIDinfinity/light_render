import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action, 'payload.changedFields', '') || {};
  const result = Object.entries(changedFields).reduce((acc, [key, value]) => {
    acc[key] = formUtils.queryValue(value);
    return acc;
  }, {});
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.policyList[0] = {
      ...draftState.businessData.policyList[0],
      ...result,
    };
  });
  return { ...nextState };
};
