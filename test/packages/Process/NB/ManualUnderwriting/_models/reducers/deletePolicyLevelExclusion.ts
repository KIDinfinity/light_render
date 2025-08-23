import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id } = lodash.pick(action?.payload, ['id']);
  const nextState = produce(state, (draftState: any) => {
    const policyExclusionList = lodash
      .chain(state)
      .get('businessData.policyList[0].policyExclusionList', [])
      .filter((item: any) => item.id !== id)
      .value();
    lodash.set(draftState, `businessData.policyList[0].policyExclusionList`, policyExclusionList);
  });
  return {
    ...nextState,
  };
};
