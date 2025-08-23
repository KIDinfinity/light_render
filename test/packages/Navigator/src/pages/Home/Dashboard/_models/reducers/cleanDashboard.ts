export default (state: any) => {
  return {
    ...state,
    chartList: [],
    chartListAll: [],
    chartListMap: {},
    categoryList: [],
    chartListV2Map: [],
    departmentList: [],
    page: 0,
    hasMore: true,
    forms: {},
  };
};
