import { produce } from 'immer';
import lodash from 'lodash';
export default (state, action) => {
  return produce(state, (draftState) => {
    lodash.set(draftState, 'processData.policyNoInfo.policyNo', action?.payload);
    lodash.set(draftState, 'processData.policyId', action?.payload);
  });
};
