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
import lodash from 'lodash';

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
        showFilter: !lodash.isEmpty(
          lodash.filter(
            dashboardSearchFieldList,
            (item: any) => item?.visible && item?.visible !== 2
          )
        ),
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
  const lld = [];
  const rrd = [];
  dashboardList.forEach((item) => {
    const data = {
      sequence: item?.sequence,
      dashboardCode: item?.dashboardCode,
      seriesNo: item?.seriesNo,
      category: item?.dashboardSeriesConfigVO?.category,
      sequenceNoInSeries: item?.dashboardSeriesConfigVO?.sequenceNoInSeries,
    };
    if (data.category === 'submission') {
      lld.push(data);
    } else {
      rrd.push(data);
    }
  }, []);

  const sortLLD = lodash.sortBy(lld, 'sequence');
  const sortRRD = lodash.sortBy(rrd, 'sequence');
  const sortLD = sortLLD
    .reduce((r, c) => {
      if (lodash.isEmpty(r?.[c.sequenceNoInSeries])) {
        r[c.sequenceNoInSeries] = [];
      }
      r[c.sequenceNoInSeries].push(c.dashboardCode);
      return r;
    }, [])
    .filter((item) => item);
  const sortRD = sortRRD
    .reduce((r, c) => {
      if (lodash.isEmpty(r?.[c.sequenceNoInSeries])) {
        r[c.sequenceNoInSeries] = [];
      }
      r[c.sequenceNoInSeries].push(c.dashboardCode);
      return r;
    }, [])
    .filter((item) => item);

  return {
    ...dashboardDatas,
    chartListAll,
    chartListMap,
    departmentList: [...new Set([...dashboardDatas.departmentList])],
    categoryList: [...new Set([...dashboardDatas.categoryList])],
    chartListV2Map: { left: sortLD, right: sortRD },
  };
};
