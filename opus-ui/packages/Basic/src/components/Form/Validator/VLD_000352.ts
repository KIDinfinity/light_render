import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000352 = (submissionDate: any) => {
  const fieldName = formatMessageApi({
    Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
  });
  return moment(formUtils.queryValue(submissionDate)).isValid()
    ? ''
    : {
        code: 'VLD_000352',
        content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000371' }, fieldName),
      };
};
