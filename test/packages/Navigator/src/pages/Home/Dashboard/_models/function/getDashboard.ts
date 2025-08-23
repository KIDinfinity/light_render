import { safeParseUtil } from '@/utils/utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {
  getDataFormat,
  getDefaultValue,
  getSearchFields,
  getChartData,
  getMiscType,
  getChartList,
} from './index';

export default (dashboardList: any[]) => {
  const dashboardDatas = dashboardList?.reduce(
    (dataMap: any, item: any) => {
      const dashboardSearchFieldList = getSearchFields({
        dashboardSearchFieldList: item?.dashboardSearchFieldList,
        dropdownOptions: item?.dropdownOptions,
      });
      const { dataFormat, format } = getDataFormat(item?.dataFormat);
      const chartData = safeParseUtil(item?.chartData, {});
      if (chartData?.yField?.length && chartData?.data?.length) {
        chartData.yField.map((field) => {
          chartData.data.map((obj) => {
            if (obj[field] && typeof obj[field] === 'string' && !isNaN(Number(obj[field]))) {
              obj[field] = Number(obj[field]);
            }
          });
        });
      }

      const chartItem = {
        ...item,
        chartData,
        dataFormat,
        format,
        dashboardSearchFieldList,
        searchDatas: getDefaultValue(dashboardSearchFieldList),
        miscType: getMiscType(item?.miscTypeList),
        title: formatMessageApi({ Label_COM_ReportCenter: item?.dashboardCode }),
      };
      return item.dashboardCode
        ? {
            chartListAll: [...dataMap.chartListAll, item.dashboardCode],
            chartListMap: {
              ...dataMap.chartListMap,
              [item.dashboardCode]: {
                ...chartItem,
                ...getChartData(chartItem),
              },
            },
            departmentList: [...dataMap.departmentList, item?.department],
            categoryList: [...dataMap.categoryList, item?.dashboardCategory],
          }
        : { ...dataMap };
    },
    {
      chartListMap: {},
      chartListAll: [],
      departmentList: [],
      categoryList: [],
    }
  );
  // 排序并重置sequence
  const { chartListAll, chartListMap }: any = getChartList({
    chartList: dashboardDatas.chartListAll,
    chartListMap: dashboardDatas.chartListMap,
    renderIndex: true,
  });
  return {
    ...dashboardDatas,
    chartListAll,
    chartListMap,
    departmentList: [...new Set([...dashboardDatas.departmentList])],
    categoryList: [...new Set([...dashboardDatas.categoryList])],
  };
};
