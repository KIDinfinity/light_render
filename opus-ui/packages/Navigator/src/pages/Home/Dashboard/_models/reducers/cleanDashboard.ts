export default (state: any) => {
  return {
    ...state,
    chartList: [],
    chartListAll: [],
    chartListMap: {},
    categoryList: [],
    departmentList: [],
    page: 0,
    hasMore: true,
  };
};
