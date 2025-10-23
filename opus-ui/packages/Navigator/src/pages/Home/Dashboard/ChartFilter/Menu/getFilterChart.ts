import { isEmpty, every, filter } from 'lodash';

export default ({ category, department, chartListMap, chartListAll, search }: any) => {
  const filterChartList = filter(chartListAll, (item: string) => {
    const matchCategory = isEmpty(category)
      ? true
      : category.includes(chartListMap?.[item]?.dashboardCategory);
    const matchDepartment = isEmpty(department)
      ? true
      : department.includes(chartListMap?.[item]?.department);
    const matchSearch = isEmpty(search)
      ? true
      : String(chartListMap?.[item]?.title).toLowerCase().includes(String(search).toLowerCase());
    return !!item && matchCategory && matchDepartment && matchSearch;
  });

  return {
    filterChartList,
    isAllVisible:
      filterChartList.length > 0 &&
      every(filterChartList, (dashboardCode: string) => chartListMap?.[dashboardCode]?.visible),
  };
};
