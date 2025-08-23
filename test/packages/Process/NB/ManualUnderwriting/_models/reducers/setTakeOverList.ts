import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, id } = lodash.pick(action?.payload, ['changedFields', 'id']);
  const nextState = produce(state, (draftState: any) => {
    const takeOverList = lodash.get(draftState, 'businessData.takeOverList');
    const index = lodash.findIndex(takeOverList, (item: any) => item?.id === id);
    const ownPolicySection = lodash.get(draftState, `businessData.takeOverList[${index}]`);
    lodash.set(draftState, `businessData.takeOverList[${index}]`, {
      ...ownPolicySection,
      ...changedFields,
    });
  });

  return { ...nextState };
};
