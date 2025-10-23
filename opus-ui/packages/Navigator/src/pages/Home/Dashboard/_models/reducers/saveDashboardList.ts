import { produce } from 'immer';

export default (state: any, action: any) => {
  const {
    chartListMap,
    chartListAll = [],
    categoryList = [],
    departmentList = [],
  } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.chartListAll = chartListAll;
    draftState.chartListMap = chartListMap;
    draftState.categoryList = categoryList.filter((item: any) => !!item);
    draftState.departmentList = departmentList.filter((item: any) => !!item);
  });
  return { ...nextState };
};
