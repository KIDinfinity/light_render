import { produce }  from 'immer';
import lodash from 'lodash';

const deleteFundSelectedRow = (state: any, action: any) => {
  const { id } = action.payload;
  const { businessData } = state;
  const totalFundInfoList = lodash.get(businessData, 'policyList[0].fundInfo.totalFundInfoList');
  const filterList = lodash.filter(totalFundInfoList, (item) => item.id !== id);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'stepsChange.PlanInfo', true);

    lodash.set(draftState, `businessData.policyList[0].fundInfo.totalFundInfoList`, filterList);
  });
  return { ...nextState };
};

export default deleteFundSelectedRow;
