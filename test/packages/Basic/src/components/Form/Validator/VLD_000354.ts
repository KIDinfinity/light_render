import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000354 = (incidentListMap: any) => {
  const fieldName = formatMessageApi({
    Label_BIZ_Claim: 'DateOfDeath',
  });
  const errorMessage = {
    code: 'VLD_000354',
    content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000371' }, fieldName),
  };
  if (lodash.size(incidentListMap) === 0) return errorMessage;
  return lodash.every(incidentListMap, (incident: any) =>
    formUtils.queryValue(incident?.dateTimeOfDeath)
  )
    ? ''
    : errorMessage;
};
