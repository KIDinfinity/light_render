import React from 'react';
import Component from '../Component';
import { ChartType } from '../../Enum';

type ChartTypeElement = (props: any) => React.ReactElement;

export default ({ chartType, ...propsRes }: any) => {
  const Config: Record<string, ChartTypeElement> = {
    [ChartType.line]: (props: any) => <Component.ChartLine {...props} />,
    [ChartType.bar]: (props: any) => <Component.ChartBar {...props} />,
    [ChartType.pie]: (props: any) => <Component.ChartPie {...props} />,
    [ChartType.stack]: (props: any) => <Component.ChartBar {...props} type="intervalStack" />,
    [ChartType.Column]: (props: any) => <Component.Column {...props} />,
    [ChartType.ColumnLine]: (props: any) => <Component.ColumnLine {...props} />,
    [ChartType.StackedColumnLine]: (props: any) => <Component.StackedColumnLine {...props} />,
    [ChartType.GroupedColumnLine]: (props: any) => <Component.GroupedColumnLine {...props} />,
    [ChartType.DualLine]: (props: any) => <Component.DualLine {...props} />,
    [ChartType.StackedColumn]: (props: any) => <Component.StackedColumn {...props} />,
    default: () => <div>Not Matching Chart!</div>,
  };

  if (Config[chartType]) {
    return Config[chartType]({ ...propsRes, chartType });
  }

  return Config.default;
};
