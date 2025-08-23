import { colors } from '../config';
import { groupBy } from 'lodash';
import pie_chart from '../../__mock__/pie_chart.json'; // 饼图
import bar_chart from '../../__mock__/bar_chart.json'; // 柱状图
import bar_chart_group from '../../__mock__/bar_chart_group.json'; // 柱状图 - 分组
import bar_chart_bigdata from '../../__mock__/bar_chart_bigdata.json'; // 柱状图 - 大数据量
import stack_chart from '../../__mock__/stack_chart.json'; // 堆叠柱状图
import line_chart from '../../__mock__/line_chart.json'; // 折线图
import dua_line from '../../__mock__/dua_line.json'; // 双折线图
import StackedColumnLine from '../../__mock__/StackedColumnLine.json'; // 柱状图+折线图
import GroupedColumnLine from '../../__mock__/GroupedColumnLine.json'; // 分组柱状+折线
import line_chart_multiple from '../../__mock__/line_chart_multiple.json'; // 多折线
import line_chart_bigdata from '../../__mock__/line_chart_bigdata.json'; // 多折线 - 大数据量
import ColumnLine from '../../__mock__/ColumnLine.json'; // 柱状-折线 - 单折线
import ColumnLine_multipleLine from '../../__mock__/ColumnLine_multipleLine.json'; // 柱状-折线 - 多折线

const chartMap = {
  bar_chart: '柱状图',
  line_chart: '折线图',
  pie_chart: '饼图',
  stack_chart: '堆叠柱状图',
  DualLine: '双折线图',
  StackedColumnLine: '堆叠柱状-折线图',
  Column: '柱状',
  GroupedColumnLine: '分组柱状-折线图',
  ColumnLine: '柱状-折线图',
};

// bar_chart = 'bar_chart',
// line_chart = 'line_chart',
// pie_chart = 'pie_chart',
// stack_chart = 'stack_chart',
// Column = 'Column',
// StackedColumnLine = 'StackedColumnLine', // 堆叠柱状-折线
// GroupedColumnLine = 'GroupedColumnLine', // 分组柱状-折线
// DualLine = 'DualLine', // 多折线
// ColumnLine = 'ColumnLine', // 柱状-折线
// StackedColumn = 'stacked_column', // 柱状

type ChartType = keyof typeof chartMap;

export default [
  pie_chart,
  dua_line,
  bar_chart,
  bar_chart_group,
  bar_chart_bigdata,
  stack_chart,
  line_chart,
  line_chart_multiple,
  line_chart_bigdata,
  StackedColumnLine,
  GroupedColumnLine,
  ColumnLine,
  ColumnLine_multipleLine,
].reduce((data: any, item: any) => {
  const existTarget = data.find((el: any) => el.chartType === item.chartType);
  const existLen = Object.keys(groupBy(data, 'chartType')).length;
  return data.concat([
    {
      ...item,
      chartTitleColor: existTarget?.chartTitleColor || colors[existLen],
      chartTypeTitle:
        item.chartType +
        ' - ' +
        chartMap[item.chartType as ChartType] +
        (item?.chartTypeDesc ? ' - ' + item.chartTypeDesc : ''),
    },
  ]);
}, []);
