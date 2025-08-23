import { chain, uniqBy } from 'lodash';
import { ChartType, ChartBasicWidth } from '../../Enum';

export default ({ chartType, chartData }: any) => {
  if (
    [
      ChartType.DualLine,
      ChartType.StackedColumnLine,
      ChartType.GroupedColumnLine,
      ChartType.ColumnLine,
    ].includes(chartType)
  ) {
    const { leftSerieField, rightSerieField, lineSeriesField, columnGroupField, columnStackField } =
      chartData || {};
    const groupFields = [
      leftSerieField || columnGroupField || columnStackField,
      rightSerieField || lineSeriesField,
    ];
    const legends = chain(chartData)
      .get('data')
      .map((item: any, index: number) => {
        return groupFields?.[index] ? uniqBy(item, groupFields?.[index]) : [];
      })
      .flatten()
      .value();

    return ChartBasicWidth.Legend * legends?.length;
  }
};
