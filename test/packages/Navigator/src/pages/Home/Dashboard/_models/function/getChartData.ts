import lodash from 'lodash';
import { chain } from 'lodash';
import getRenderTitle from './getRenderTitle';
import getChartWidth from './getChartWidth';
import { G2Chart } from '../../Enum';
import getComboData from './getComboData';
import getFields from './getFields';

// bizchart
const getBizChartData = ({ miscType, chartData, xAxisFormat, chartType }: any) => {
  const xMiscType = miscType?.[chartData?.x];
  const nameMiscType = miscType?.[chartData?.name];

  let typeCodeDicts: any = {};

  const data = (chain(chartData) as any)
    .get('data')
    .map((item: any) =>
      chain(item)
        .keys()
        .reduce((dataMap: any, key: string) => {
          if (lodash.isNumber(item[key])) {
            typeCodeDicts = {
              ...typeCodeDicts,
              [getRenderTitle(xAxisFormat, key, xMiscType)]: key,
            };
          }

          return {
            ...dataMap,
            [getRenderTitle(xAxisFormat, key, xMiscType)]:
              key === chartData?.name ? String(item[key]) : item[key],
          };
        }, {})
        .value()
    )
    .value();

  const { fields, scaleType } = getFields({
    fields: chartData?.fields,
    xAxisFormat,
    xMiscType,
  });

  const { width, forceFit } = getChartWidth({ chartType, chartData, fieldsLength: fields.length });

  return {
    chartData: {
      ...chartData,
      data,
      titleDicts: { ...chartData?.titleDicts, [chartData?.x]: typeCodeDicts },
      fields: fields || [],
    },
    xMiscType,
    nameMiscType,
    width,
    forceFit,
    fieldsLength: fields.length,
    dataLength: data.length,
    scaleType,
    smallScreenFit: {},
  };
};

// g2plot combo
const getG2PlotData = ({ chartData, chartType, miscType, xAxisFormat }: any) => {
  const xMiscType = miscType?.[chartData?.xField];
  const fieldsLength =
    (chain(chartData) as any).get('data').flattenDeep().uniqBy(chartData?.xField).value()?.length ||
    0;
  const { width, forceFit } = getChartWidth({ chartType, chartData, fieldsLength });
  return {
    chartData: {
      ...chartData,
      data: getComboData({
        chartData,
        xAxisFormat,
        xMiscType,
      }),
    },
    width,
    forceFit,
  };
};

export default ({ miscType, chartData, xAxisFormat, chartType }: any) => {
  if (G2Chart.includes(chartType)) {
    return getG2PlotData({ miscType, chartData, xAxisFormat, chartType });
  }
  return getBizChartData({ miscType, chartData, xAxisFormat, chartType });
};
