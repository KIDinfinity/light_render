/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { groupId, libs } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const groupIndex = lodash.findIndex(
      draftState.submitRuleSet?.groups,
      (item) => item.groupId === groupId
    );

    if (groupIndex !== -1) {
      draftState.submitRuleSet.groups[groupIndex].rules = lodash.map(
        draftState.submitRuleSet.groups[groupIndex].rules,
        (item) => {
          if (lodash.isPlainObject(item)) {
            const lib = lodash.find(libs, (libItem) => libItem?.frontId === item.id);

            if (lodash.isPlainObject(lib)) {
              return {
                ...item,
                id: lib.baseRule.id,
                checked: false,
                binded: '1',
              };
            }
          }

          return item;
        }
      );
    }
  });

  return { ...nextState };
};
