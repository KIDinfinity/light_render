import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const policyExclusionList = lodash.get(state, 'processData.policyExclusionList', []) || [];
    lodash.set(draftState, `processData.policyExclusionList`, [
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
