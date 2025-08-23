import { produce }  from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const policyExclusionList =
      lodash.get(state, 'businessData.policyList[0].policyExclusionList', []) || [];
    lodash.set(draftState, `businessData.policyList[0].policyExclusionList`, [
      ...policyExclusionList,
      {
        id: uuid(),
      },
    ]);
  });
  return {
    ...nextState,
  };
};
