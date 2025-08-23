import React from 'react';
import ChartBar from './ChartBarBiz';
import ChartPie from './ChartPie';
import ChartLine from './ChartLine';

type ChartTypeElement = (props: any) => React.ReactElement;

interface ChartComponentProps {
  chartType: string;
  [key: string]: any;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ chartType, ...propsRes }) => {
  const Config: Record<string, ChartTypeElement> = {
    bar_chart: (props: any) => <ChartBar {...props} />,
    pie_chart: (props: any) => <ChartPie {...props} />,
    line_chart: (props: any) => <ChartLine {...props} />,
    default: () => <div>Not Matching Chart!</div>,
  };

  if (Config[chartType]) {
    return Config[chartType]({ ...propsRes, chartType });
  }

  return <Config.default />;
};

export default ChartComponent;
