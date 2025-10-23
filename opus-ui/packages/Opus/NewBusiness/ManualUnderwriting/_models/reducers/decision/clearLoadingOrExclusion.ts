import deleteLoadingList from "./deleteLoadingList";
import deleteBenefitLevelExclusionItem from "./deleteBenefitLevelExclusionItem";

export default (state: any, action: any) => {
  const { clearedLoadingIdList = [], clearedExclusionIdList = [], coverageItemId } = action?.payload;
  let nextState = state;
  clearedLoadingIdList.map(id => nextState = deleteLoadingList(nextState, { payload: { id } }));
  clearedExclusionIdList.map(id => nextState = deleteBenefitLevelExclusionItem(nextState, { payload: { id, coverageItemId } }));
  return nextState;
};
