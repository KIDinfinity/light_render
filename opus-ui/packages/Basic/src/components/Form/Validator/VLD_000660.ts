import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000660 = (benefitPercentageSum) => (rule: any, value: any, callback: Function) => {
  if (benefitPercentageSum) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000559' }));
  } else {
    callback();
  }
};
