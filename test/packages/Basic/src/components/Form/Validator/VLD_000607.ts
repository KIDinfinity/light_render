import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000607 = (
  target: any,
  targetName: string,
  currentName: string,
  granularity?: any
) => (rule: any, value: any, callback: Function) => {
  const precision = granularity || 'day';
  const targetList = lodash.isArray(target) ? target : [target];

  if (lodash.chain(targetList).compact().size().value() === 0 || !value) return callback();
  if (lodash.every(targetList, (item) => moment(item).isSameOrBefore(value, precision))) {
    callback();
    return () => {};
  }

  callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000527' }, currentName, targetName));
  return VLD_000607;
};
