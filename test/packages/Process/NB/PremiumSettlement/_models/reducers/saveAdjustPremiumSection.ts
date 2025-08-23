import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = lodash.pick(action?.payload, ['changedFields']);

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'adjustPremium')) {
        const adjustPremium = formUtils.queryValue(changedFields.adjustPremium);
        const premiumReceived = lodash.get(
          draftState,
          'businessData.policyList[0].premiumReceived'
        );
        const totalPremium = premiumReceived - adjustPremium;
        lodash.set(draftState, 'businessData.policyList[0]', {
          ...lodash.get(draftState, 'businessData.policyList[0]', {}),
          ...changedFields,
          totalPremium,
        });
      } else {
        lodash.set(draftState, 'businessData.policyList[0]', {
          ...lodash.get(draftState, 'businessData.policyList[0]', {}),
          ...changedFields,
        });
      }
    }
  });
  return { ...nextState };
};
