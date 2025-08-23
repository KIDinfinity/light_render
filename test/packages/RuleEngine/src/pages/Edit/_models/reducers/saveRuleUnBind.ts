/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { data } = action.payload;

    const groupIndex = lodash.findIndex(
      draftState.submitRuleSet?.groups,
      (item) => item?.groupId === data?.groupId
    );

    if (groupIndex !== -1) {
      lodash.forEach(draftState.submitRuleSet.groups[groupIndex]?.rules, (item) => {
        if (item?.id === data?.id) {
          item.binded = '0';
          item.basicRuleId = '';
        }
      });
    }
  });
