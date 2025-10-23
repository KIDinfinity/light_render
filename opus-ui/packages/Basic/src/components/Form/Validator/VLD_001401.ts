import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';

export const VLD_001401 = (subAcBalance, decision) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value > subAcBalance && decision === DecisionEnum.A) {
    callback(formatMessageApi({ message: 'ERR_000293' }));
  }
  callback()
};
