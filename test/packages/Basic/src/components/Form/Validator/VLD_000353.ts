import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000353 = (diagnosisListMap: any) => {
  const fieldName = formatMessageApi({
    Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.diagnosis-code-name',
  });
  const errorMessage = {
    code: 'VLD_000353',
    content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000371' }, fieldName),
  };
  if (lodash.size(diagnosisListMap) === 0) return errorMessage;
  return lodash.every(diagnosisListMap, (diagnosis: any) =>
    formUtils.queryValue(diagnosis?.diagnosisCode)
  )
    ? ''
    : errorMessage;
};
