import lodash from 'lodash';
import DurationFormat from '@/components/CustomForm/Enum/DurationFormat';
// import Format from 'navigator/pages/ReportCenter/Enum/Format';
import { DataFormat } from '../Enum';

export default (dataFormat: string) => {
  let dataFormatTemp = !lodash.isEmpty(dataFormat) ? dataFormat : DataFormat.number;

  if (DurationFormat?.[dataFormatTemp]) {
    dataFormatTemp = DataFormat.duration;
  }

  return {
    dataFormat: dataFormatTemp,
    format: dataFormatTemp !== dataFormat ? dataFormat : null,
  };
};
