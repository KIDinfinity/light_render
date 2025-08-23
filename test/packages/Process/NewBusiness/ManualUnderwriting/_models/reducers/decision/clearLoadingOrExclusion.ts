import deleteLoadingList from "./deleteLoadingList";
import deleteBenefitLevelExclusionItem from "./deleteBenefitLevelExclusionItem";

export default (state: any, action: any) => {
  const { clearedLoadingIdList = [], clearedExclusionIdList = [] } = action?.payload;
  clearedLoadingIdList.map(id => deleteLoadingList(state, { payload: { id } }));
  clearedExclusionIdList.map(id => deleteBenefitLevelExclusionItem(state, { payload: { id } }));
};
