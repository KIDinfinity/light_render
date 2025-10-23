import { ChartBasicWidth } from '../../Enum';
import getLegendWidth from './getLegendWidth';

export default ({ chartType, fieldsLength, chartData }: any) => {
  const forceFit = false;
  let width = 320;

  const fieldWidth = ChartBasicWidth[chartType] ? fieldsLength * ChartBasicWidth[chartType] : width;

  if (fieldWidth > width) {
    width = fieldWidth;
  }

  const legendWidth = getLegendWidth({ chartType, chartData });

  if (legendWidth && legendWidth > width) {
    width = legendWidth;
  }

  return {
    forceFit,
    width,
  };
};
