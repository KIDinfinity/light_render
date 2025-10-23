import lodash from 'lodash';
import moment from 'moment';

const isIsoDateFormat = (val: string) =>
  lodash.isString(val) && lodash.isNaN(+val) && moment(val, moment.ISO_8601, true).isValid();

export default isIsoDateFormat;
