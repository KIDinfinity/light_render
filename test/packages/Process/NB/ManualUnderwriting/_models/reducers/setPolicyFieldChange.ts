import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = lodash.pick(action?.payload, ['changedFields']);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.policyList[0]', {
      ...lodash.get(draftState, 'businessData.policyList[0]', {}),
      ...changedFields,
    });
  });
  return { ...nextState };
};
