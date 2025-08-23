/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import lodash from 'lodash';

/**
 * 用于解决格式跟moment,不跟umi
 * 输入format不需要连接符，跟用户习惯
 */

const getFormatByLongDateFormat = (formatCode: string, formatObject: object): string => {
  return lodash.map(formatCode.split(' '), (code) => formatObject[code] || code).join(' ');
};

const getFormatObject = (): object | null => {
  // @ts-ignore
  if (moment()?._locale?._longDateFormat) {
    // @ts-ignore
    return moment()._locale._longDateFormat;
  }
  // eslint-disable-next-line no-console
  console.warn('moment插件中不存在_locale对象,请检查!');
  return null;
};

const getDateFormatArray = (format: string) => {
  let displayFormat = format || 'YYYY/MM/DD';
  const defaultFormat = 'YYYYMMDD';

  const formatObject = getFormatObject();

  if (formatObject && format) {
    displayFormat = getFormatByLongDateFormat(format, formatObject);
  }
  const DateFormat = [displayFormat, defaultFormat];
  return DateFormat;
};

const getDateFormat = (format: string) => {
  let displayFormat = format || 'L';

  const formatObject = getFormatObject();

  if (formatObject) {
    displayFormat = getFormatByLongDateFormat(displayFormat, formatObject);
  }
  const DateFormat = displayFormat;
  return DateFormat;
};

const getTimeFormat = (format: string) => {
  let displayFormat = format || 'HH:mm:ss';

  const formatObject = getFormatObject();

  if (formatObject && format) {
    displayFormat = getFormatByLongDateFormat(format, formatObject);
  }
  const DateFormat = displayFormat;
  return DateFormat;
};

export { getFormatByLongDateFormat, getDateFormat, getTimeFormat, getDateFormatArray };

export default getDateFormat;
