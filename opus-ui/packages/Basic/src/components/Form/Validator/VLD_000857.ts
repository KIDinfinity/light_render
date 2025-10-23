import { formatMessageApi } from '@/utils/dictFormatMessage';
import { OptionEnum } from 'process/GeneralPOS/common/Enum';
import lodash from 'lodash';

export const VLD_000857 = (list) => (rule: any, value: any, callback: Function) => {
  if (value === OptionEnum.BTR && lodash.isEmpty(list)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000872' }));
    return;
  }

  callback();
};
