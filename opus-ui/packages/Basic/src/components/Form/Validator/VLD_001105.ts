import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';

export const VLD_001105 = (submissionDate: any) => (rule: any, value: any, callback: any) => {
  if (
    !submissionDate ||
    moment(submissionDate).startOf('day').valueOf() < moment(value).startOf('day').valueOf()
  ) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001249' }));
  }

  callback();
};
