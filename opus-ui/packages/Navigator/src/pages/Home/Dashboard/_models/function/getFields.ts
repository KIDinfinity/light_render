import moment from 'moment';
import lodash, { compact, isNumber } from 'lodash';
import getRenderTitle from './getRenderTitle';

const timeCat = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD'];

export default ({ fields, xAxisFormat, xMiscType }: any) => {
  const fieldArrays = lodash.map(compact(fields), (item: any) =>
    getRenderTitle(xAxisFormat, item, xMiscType)
  );

  if (!isNumber(fieldArrays?.[0]) && !!moment(fieldArrays?.[0]).isValid()) {
    const format: any = moment(fieldArrays?.[0]).creationData()?.format;
    return {
      fields: fieldArrays,
      scaleType: timeCat?.includes(format) ? 'cat' : '',
    };
  }

  return {
    fields: fieldArrays,
    scaleType: '',
  };
};
