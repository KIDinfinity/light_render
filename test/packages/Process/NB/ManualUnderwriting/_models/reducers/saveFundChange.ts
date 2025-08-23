import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const totalFundInfoList = draftState?.businessData?.policyList[0]?.fundInfo?.totalFundInfoList;
    const targetItem = lodash.find(totalFundInfoList, (item: any) => item.id === id);
    const newItem = { ...targetItem, ...changedFields };
    const newTotalFundInfoList = lodash.map(totalFundInfoList, (item: any) => {
      if (item.id === id) {
        return newItem;
      }
      return item;
    });
    draftState.businessData.policyList[0].fundInfo.totalFundInfoList = newTotalFundInfoList;
  });
  return { ...nextState };
};
