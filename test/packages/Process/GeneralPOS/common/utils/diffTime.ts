import moment from 'moment';
import { formUtils } from 'basic/components/Form';

export default (time1: any, time2: any) => {
  const newtime1 = `${formUtils.queryValue(time1)}`;
  const newtime2 = `${formUtils.queryValue(time2)}`;

  if (!moment(newtime1).isValid() && !moment(newtime2).isValid()) {
    return false;
  }

  return !moment(newtime1).isSame(moment(newtime2), 'day');
};
