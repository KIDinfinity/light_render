import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import { TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';

export const VLD_000834 =
  (sourceSystem: string, transactionTypeCode: string) =>
  (rule: any, value: any, callback: Function) => {
    if (
      sourceSystem === 'IL' &&
      moment(value).isValid() &&
      moment(value).isBefore(moment(), 'day') &&
      [TransactionTypeEnum.SRV003, TransactionTypeEnum.SRV006, TransactionTypeEnum.SRV011].includes(
        transactionTypeCode
      )
    ) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000836' }));
    }
    callback();
  };
