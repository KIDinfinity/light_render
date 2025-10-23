import { formatMessageApi } from '@/utils/dictFormatMessage';
import { add } from '@/utils/precisionUtils';

export const VLD_000632 = (currentTotalFund: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (add(currentTotalFund, value) > 100) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000557' }));
    return;
  }
  callback();
};
