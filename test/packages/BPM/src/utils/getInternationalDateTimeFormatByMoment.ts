import moment from 'moment';

/**
 * params:
 * TODO expand param dateFormat:only dateFormat,default current region dateFormat in moment with L
 * timeFormat:only timeFormat
 */
export default (config) => {
  const { timeFormat } = config;
  let dateFormat = moment?.localeData()?.longDateFormat('L');
  if (!dateFormat) {
    dateFormat = 'DD/MM/YYYY';
  }
  return dateFormat + ' ' + timeFormat;
};
