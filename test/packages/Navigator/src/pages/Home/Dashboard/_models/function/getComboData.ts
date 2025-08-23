import lodash from 'lodash';
import getRenderTitle from './getRenderTitle';

export default ({ chartData, xAxisFormat, xMiscType }: any) => {
  const format = (item) =>
    lodash.keys(item).reduce((dataMap: any, key) => {
      if (key === chartData?.xField) {
        return {
          ...dataMap,
          [key]: String(getRenderTitle(xAxisFormat, item[key], xMiscType)),
          [`${key}_dictCode`]: item[key],
        };
      }
      if (chartData?.yField?.includes(key)) {
        return {
          ...dataMap,
          [key]: item[key] || 0,
        };
      }
      if (
        [
          chartData?.lineSeriesField,
          chartData?.columnStackField,
          chartData?.columnGroupField,
        ].includes(key)
      ) {
        return {
          ...dataMap,
          [key]: String(item[key]),
        };
      }
      return {
        ...dataMap,
        [key]: item[key],
      };
    }, {});
  return (lodash.chain(chartData) as any)
    .get('data')
    .map((itemArr: any) => {
      return lodash.isArray(itemArr) ? lodash.map(itemArr, format) : format(itemArr);
    })
    .value();
};
