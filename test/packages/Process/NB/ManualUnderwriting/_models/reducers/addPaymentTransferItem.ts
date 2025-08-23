import { produce }  from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action?.payload, 'changedFields');
  const nextState = produce(state, (draftState: any) => {
    const premiumTransferList =
      lodash.get(draftState, 'businessData.policyList[0].premiumTransferList', []) || [];
    lodash.set(draftState, 'businessData.policyList[0].premiumTransferList', [
      ...premiumTransferList,
      {
        id: uuid(),
        policyId: lodash.get(draftState, 'businessData.policyId'),
        ...changedFields,
      },
    ]);
  });
  return { ...nextState };
};
