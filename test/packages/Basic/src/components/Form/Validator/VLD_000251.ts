import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const UNIT = 'day';

/**
 *
 * @param array 已存在的procedurecode
 */
export const VLD_000251 = (operationDate: any, existProcedure: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  let codeDuplicate = false;
  lodash.some(existProcedure, (item) => {
    if (item.procedureCode === value && moment(item.operationDate).isSame(operationDate, UNIT)) {
      codeDuplicate = true;
    }
  });

  if (codeDuplicate) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000091' }));
  }
  callback();
};
