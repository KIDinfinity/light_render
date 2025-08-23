import { produce }  from 'immer';
import lodash from 'lodash';

const deleteFundSelectedRow = (state: any, action: any) => {
  const { selectedRow } = action.payload;
  const { businessData } = state;
  const replacementInfoList = lodash.get(businessData, 'policyList[0].replacementInfoList');
  const filterList = lodash.filter(replacementInfoList, (item) => item.id !== selectedRow.id);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'stepsChange.PlanInfo', true);
    lodash.set(draftState, `businessData.policyList[0].replacementInfoList`, filterList);
    if (!filterList?.length) {
      lodash.set(draftState, `businessData.policyList[0].policyReplacementFlag`, 'N');
    }
  });
  return { ...nextState };
};

export default deleteFundSelectedRow;
