import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, data } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'stepsChange.PlanInfo', true);
    const replacementInfoList =
      lodash.get(draftState, 'businessData.policyList[0].replacementInfoList') || [];
    const newList = lodash.map(replacementInfoList, (item: any) => {
      if (item.id === data.id) {
        return { ...item, ...changedFields };
      }
      return item;
    });
    lodash.set(draftState, 'businessData.policyList[0].replacementInfoList', newList);
  });
  return { ...nextState };
};
