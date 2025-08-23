import { produce }  from 'immer';

const addGroupConditions = (state: any, action: any) => {
  const { list, groupId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    const index = draftState.submitRuleSet.groups.findIndex((item) => item.groupId === groupId);
    draftState.submitRuleSet.groups[index].rules.push(...list);
  });
  return { ...nextState };
};

export default addGroupConditions;
